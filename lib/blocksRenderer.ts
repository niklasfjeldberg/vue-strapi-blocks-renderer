import { h } from 'vue';

import { Block } from './block';

import type {
  ComponentsContextValue,
  BlocksRendererProps,
  BlocksComponents,
  ModifiersComponents,
} from './types';

export const defaultComponents: ComponentsContextValue = {
  blocks: {
    'paragraph': (props) => h('p', {}, props.children),
    'quote': (props) => h('blockquote', {}, props.children),
    'code': (props) => h('pre', {}, [h('code', {}, props.children)]),
    'heading': ({ level, children }) => {
      switch (level) {
        case 1:
          return h('h1', {}, children);
        case 2:
          return h('h2', {}, children);
        case 3:
          return h('h3', {}, children);
        case 4:
          return h('h4', {}, children);
        case 5:
          return h('h5', {}, children);
        case 6:
          return h('h6', {}, children);
      }
    },
    'link': (props) => h('a', { href: props.url }, props.children),
    'list': (props) => {
      const isUl = props.format === 'ordered';
      return h(isUl ? 'ol' : 'ul', {}, props.children);
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
};

export const BlocksRenderer = (props: BlocksRendererProps) => {
  // Merge default blocks with the ones provided by the user
  const blocks: BlocksComponents = {
    ...defaultComponents.blocks,
    ...props.blocks,
  };

  // Merge default modifiers with the ones provided by the user
  const modifiers: ModifiersComponents = {
    ...defaultComponents.modifiers,
    ...props.modifiers,
  };

  const componentsContext: ComponentsContextValue = {
    blocks,
    modifiers,
    missingBlockTypes: [],
    missingModifierTypes: [],
  };

  if (!props.content) throw new Error('BlocksRenderer content is empty');

  const divs = props.content.map((content) =>
    Block({ content, componentsContext }),
  );

  return h(
    'div',
    {
      class: 'strapi-blocks-wrapper',
      missingBlockTypes: componentsContext.missingBlockTypes,
      missingModifierTypes: componentsContext.missingModifierTypes,
    },
    divs,
  );
};
