import type { PropType } from 'vue'
import { h, Fragment, Comment, defineComponent, provide, toRefs } from 'vue'

import { Block } from './block'
import { contextKey } from './context'

import type {
  ComponentsContextValue,
  BlocksRendererProps,
  BlocksComponents,
  ModifiersComponents,
} from './types'

/**
 * Default components used for rendering Strapi blocks.
 * Can be extended or overridden by passing custom components to BlocksRenderer.
 */
export const defaultComponents: ComponentsContextValue = {
  blocks: {
    'paragraph': (props) => h('p', {}, props.children),
    'quote': (props) => h('blockquote', {}, props.children),
    'code': (props) => h('pre', {}, [h('code', {}, props.plainText)]),
    'heading': ({ level, children }) => {
      switch (level) {
        case 1:
          return h('h1', {}, children)
        case 2:
          return h('h2', {}, children)
        case 3:
          return h('h3', {}, children)
        case 4:
          return h('h4', {}, children)
        case 5:
          return h('h5', {}, children)
        case 6:
          return h('h6', {}, children)
      }
    },
    'link': (props) =>
      h(
        'a',
        {
          href: props.url,
          target: props.target || undefined,
          rel: props.rel || undefined,
        },
        props.children,
      ),
    'list': (props) => {
      const isOrdered = props.format === 'ordered'
      return h(isOrdered ? 'ol' : 'ul', {}, props.children)
    },

    'list-item': (props) => h('li', {}, props.children),
    'image': ({ image }) =>
      h('img', {
        src: image.url,
        alt: image.alternativeText || undefined,
      }),
  },
  modifiers: {
    bold: (props) => h('strong', {}, props.children),
    italic: (props) => h('em', {}, props.children),
    underline: (props) => h('u', {}, props.children),
    strikethrough: (props) => h('del', {}, props.children),
    code: (props) => h('code', {}, props.children),
  },
  missingBlockTypes: [],
  missingModifierTypes: [],
}

/**
 * Vue component that renders Strapi Blocks content.
 *
 * @example
 * ```vue
 * <template>
 *   <StrapiBlocks :content="article.content" />
 * </template>
 * ```
 */
export const BlocksRenderer = defineComponent({
  name: 'BlocksRenderer',
  props: {
    content: {
      type: Array as PropType<BlocksRendererProps['content']>,
      required: true,
    },
    blocks: {
      type: Object as PropType<BlocksRendererProps['blocks']>,
      default: () => ({}),
    },
    modifiers: {
      type: Object as PropType<BlocksRendererProps['modifiers']>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { content, blocks: customBlocks, modifiers: customModifiers } = toRefs(props)

    // Merge default blocks with the ones provided by the user
    const blocks: BlocksComponents = {
      ...defaultComponents.blocks,
      ...customBlocks.value,
    }

    // Merge default modifiers with the ones provided by the user
    const modifiers: ModifiersComponents = {
      ...defaultComponents.modifiers,
      ...customModifiers.value,
    }

    const componentsContext: ComponentsContextValue = {
      blocks,
      modifiers,
      missingBlockTypes: [],
      missingModifierTypes: [],
    }

    // Provide context for nested custom components
    provide(contextKey, componentsContext)

    return () => {
      if (!content.value) throw new Error('BlocksRenderer content is empty')

      const divs = content.value.map((block) =>
        Block({ content: block, componentsContext }),
      )

      if (componentsContext.missingBlockTypes.length)
        divs.unshift(
          h(Comment, `missingBlockTypes: ${componentsContext.missingBlockTypes}`),
        )

      if (componentsContext.missingModifierTypes.length)
        divs.unshift(
          h(
            Comment,
            `missingModifierTypes: ${componentsContext.missingModifierTypes}`,
          ),
        )

      return h(Fragment, divs)
    }
  },
})
