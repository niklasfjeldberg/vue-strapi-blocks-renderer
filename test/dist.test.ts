/**
 * Tests that verify the built package works correctly.
 * Run `pnpm build` before running these tests.
 *
 * These tests mirror the basic.test.ts but import from the dist folder
 * to ensure the built package works as expected for consumers.
 */
/* eslint-disable vue/one-component-per-file */
import { mount, config } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h } from 'vue'

// Import from the built dist folder instead of source
import {
  StrapiBlocks,
  BlocksRenderer,
  useStrapiBlocksContext,
  contextKey,
  type BlocksContent,
  type BlocksComponents,
  type ModifiersComponents,
  type BlockChildren,
  type RootNode,
  type ModifierChildrenProps,
  type BlocksRendererProps,
} from '../dist/vue-strapi-blocks-renderer.mjs'
import data from '../data/data.json'
import dataError from '../data/data-with-error.json'

// Suppress Vue warnings during tests
config.global.config.warnHandler = () => {}

// Store original console.warn
const originalWarn = console.warn

beforeEach(() => {
  console.warn = vi.fn()
})

afterEach(() => {
  console.warn = originalWarn
})

describe('dist exports', () => {
  it('exports StrapiBlocks component', () => {
    expect(StrapiBlocks).toBeDefined()
    expect(typeof StrapiBlocks).toBe('object')
  })

  it('exports BlocksRenderer component (alias)', () => {
    expect(BlocksRenderer).toBeDefined()
    expect(BlocksRenderer).toBe(StrapiBlocks)
  })

  it('exports useStrapiBlocksContext', () => {
    expect(useStrapiBlocksContext).toBeDefined()
    expect(typeof useStrapiBlocksContext).toBe('function')
  })

  it('exports contextKey', () => {
    expect(contextKey).toBeDefined()
  })
})

describe('dist render blocks', () => {
  const blocks = mount(StrapiBlocks, {
    props: {
      content: data as BlocksContent,
    },
  })

  it('h1', () => {
    expect(blocks.html()).toContain('<h1>Header 1</h1>')
  })
  it('h2', () => {
    expect(blocks.html()).toContain('<h2>Header 2</h2>')
  })
  it('h3', () => {
    expect(blocks.html()).toContain('<h3>Header 3</h3>')
  })
  it('h4', () => {
    expect(blocks.html()).toContain('<h4>Header 4</h4>')
  })
  it('h5', () => {
    expect(blocks.html()).toContain('<h5>Header 5</h5>')
  })
  it('h6', () => {
    expect(blocks.html()).toContain('<h6>Header 6</h6>')
  })
  it('p', () => {
    expect(blocks.html()).toContain('<p>Normal text.</p>')
  })
  it('p > strong', () => {
    expect(blocks.html()).toContain('<p><strong>Bold text</strong></p>')
  })
  it('p > em', () => {
    expect(blocks.html()).toContain('<p><em>Italic text</em></p>')
  })
  it('p > u', () => {
    expect(blocks.html()).toContain('<p><u>Underlined text</u></p>')
  })
  it('p > del > u > em > strong', () => {
    expect(blocks.html()).toContain(
      '<p><del><u><em><strong>Bold, italic, underlined, and strikethorugh text</strong></em></u></del></p>',
    )
  })
  it('a', () => {
    expect(blocks.html()).toContain(
      '<a href="https://google.com">Root link</a>',
    )
  })
  it('a with target and rel', () => {
    expect(blocks.html()).toContain(
      '<a href="https://external.com" target="_blank" rel="noopener noreferrer">External link with target and rel</a>',
    )
  })
  it('p > a', () => {
    expect(blocks.html()).toContain(
      '<p><a href="https://google.com">Inline link</a><del><u><em><strong></strong></em></u></del></p>',
    )
  })
  it('p > code', () => {
    expect(blocks.html()).toContain('<p><code>Code string</code></p>')
  })
  it('pre > code', () => {
    expect(blocks.html()).toContain('<pre><code>Code blocklink</code></pre>')
  })
  it('ol', () => {
    expect(blocks.html()).toContain('<ol>')
    expect(blocks.html()).toContain('<li>Ordered list 1</li>')
  })
  it('ul', () => {
    expect(blocks.html()).toContain('<ul>')
    expect(blocks.html()).toContain('<li>Unordered list 1</li>')
  })
  it('blockquote', () => {
    expect(blocks.html()).toContain('<blockquote>Quote</blockquote>')
  })
  it('img', () => {
    expect(blocks.html()).toContain(
      '<img src="https://cdn.pixabay.com/photo/2016/12/03/15/44/fireworks-1880045_960_720.jpg" alt="Alternative text">',
    )
  })
  it('img without alt', () => {
    expect(blocks.html()).toContain(
      '<img src="https://example.com/image-no-alt.png">',
    )
  })
  it('p with false modifiers renders text only', () => {
    expect(blocks.html()).toContain('<p>Text with false modifiers</p>')
  })

  it('empty p => br', () => {
    const dataWithBreak: BlocksContent = [
      { type: 'paragraph', children: [{ text: '', type: 'text' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content: dataWithBreak } })
    expect(wrapper.html()).toContain('<br>')
  })

  it('renders line breaks in text', () => {
    const dataWithLineBreaks: BlocksContent = [
      { type: 'paragraph', children: [{ text: 'First line\nSecond line', type: 'text' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content: dataWithLineBreaks } })
    const paragraph = wrapper.find('p')
    expect(paragraph.html()).toContain('<br>')
    expect(paragraph.html()).toContain('First line')
    expect(paragraph.html()).toContain('Second line')
  })

  it('renders consecutive line breaks in text', () => {
    const dataWithConsecutiveBreaks: BlocksContent = [
      { type: 'paragraph', children: [{ text: 'First\n\nThird', type: 'text' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content: dataWithConsecutiveBreaks } })
    const paragraph = wrapper.find('p')
    const brCount = (paragraph.html().match(/<br>/g) || []).length
    expect(brCount).toBe(2)
    expect(paragraph.html()).toContain('First')
    expect(paragraph.html()).toContain('Third')
  })

  it('heading receives plainText prop', () => {
    const dataWithHeading: BlocksContent = [
      {
        type: 'heading',
        level: 1,
        children: [
          { type: 'text', text: 'Hello ' },
          { type: 'link', url: 'https://test.com', children: [{ type: 'text', text: 'World' }] },
        ],
      },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content: dataWithHeading,
        blocks: {
          heading: ({ level, plainText, children }) =>
            h(`h${level}`, { 'data-plain-text': plainText }, children),
        },
      },
    })
    expect(wrapper.find('h1').attributes('data-plain-text')).toBe('Hello World')
  })
})

describe('dist missing blocks handling', () => {
  it('reports missing block modifiers', () => {
    const wrapper = mount(StrapiBlocks, {
      props: {
        content: dataError as BlocksContent,
      },
    })
    expect(wrapper.html()).toContain(
      'missingModifierTypes: nonExistingModifier1,nonExistingModifier2',
    )
  })

  it('reports missing block types', () => {
    const wrapper = mount(StrapiBlocks, {
      props: {
        content: dataError as BlocksContent,
      },
    })
    expect(wrapper.html()).toContain(
      'missingBlockTypes: nonExistingType1,text2,nonExistingType2',
    )
  })
})

describe('dist error handling', () => {
  it('throws error when called without props', () => {
    // @ts-expect-error - testing missing required props
    expect(() => StrapiBlocks()).toThrowError()
  })

  it('throws error when content is null', () => {
    expect(() =>
      mount(StrapiBlocks, {
        props: {
          // @ts-expect-error - testing null content
          content: null,
        },
      }),
    ).toThrowError('BlocksRenderer content is empty')
  })

  it('throws error when content is undefined', () => {
    expect(() =>
      mount(StrapiBlocks, {
        props: {
          // @ts-expect-error - testing undefined content
          content: undefined,
        },
      }),
    ).toThrowError('BlocksRenderer content is empty')
  })
})

describe('dist custom components and modifiers', () => {
  const customBlocks = mount(StrapiBlocks, {
    props: {
      content: data as BlocksContent,
      blocks: {
        paragraph: (props) => h('p', { class: 'custom-paragraph' }, props.children),
      },
      modifiers: {
        code: (props) => h('code', { class: 'custom-code' }, props.children),
      },
    },
  })

  it('renders custom block component', () => {
    expect(customBlocks.html()).toContain('class="custom-paragraph"')
  })

  it('renders custom modifier component', () => {
    expect(customBlocks.html()).toContain('class="custom-code"')
  })

  it('supports all custom block types', () => {
    const customContent: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Para' }] },
      { type: 'heading', level: 2, children: [{ type: 'text', text: 'Head' }] },
      { type: 'quote', children: [{ type: 'text', text: 'Quote' }] },
      { type: 'code', children: [{ type: 'text', text: 'Code' }] },
      { type: 'list', format: 'unordered', children: [{ type: 'list-item', children: [{ type: 'text', text: 'Item' }] }] },
    ]

    const wrapper = mount(StrapiBlocks, {
      props: {
        content: customContent,
        blocks: {
          paragraph: (props) => h('div', { 'data-block': 'paragraph' }, props.children),
          heading: (props) => h('div', { 'data-block': 'heading', 'data-level': props.level }, props.children),
          quote: (props) => h('div', { 'data-block': 'quote' }, props.children),
          code: (props) => h('div', { 'data-block': 'code' }, props.children),
          list: (props) => h('div', { 'data-block': 'list', 'data-format': props.format }, props.children),
        },
      },
    })

    expect(wrapper.html()).toContain('data-block="paragraph"')
    expect(wrapper.html()).toContain('data-block="heading"')
    expect(wrapper.html()).toContain('data-level="2"')
    expect(wrapper.html()).toContain('data-block="quote"')
    expect(wrapper.html()).toContain('data-block="code"')
    expect(wrapper.html()).toContain('data-block="list"')
    expect(wrapper.html()).toContain('data-format="unordered"')
  })

  it('supports all custom modifier types', () => {
    const customContent: BlocksContent = [
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'Bold', bold: true },
          { type: 'text', text: 'Italic', italic: true },
          { type: 'text', text: 'Underline', underline: true },
          { type: 'text', text: 'Strike', strikethrough: true },
          { type: 'text', text: 'Code', code: true },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, {
      props: {
        content: customContent,
        modifiers: {
          bold: (props) => h('span', { 'data-mod': 'bold' }, props.children),
          italic: (props) => h('span', { 'data-mod': 'italic' }, props.children),
          underline: (props) => h('span', { 'data-mod': 'underline' }, props.children),
          strikethrough: (props) => h('span', { 'data-mod': 'strikethrough' }, props.children),
          code: (props) => h('span', { 'data-mod': 'code' }, props.children),
        },
      },
    })

    expect(wrapper.html()).toContain('data-mod="bold"')
    expect(wrapper.html()).toContain('data-mod="italic"')
    expect(wrapper.html()).toContain('data-mod="underline"')
    expect(wrapper.html()).toContain('data-mod="strikethrough"')
    expect(wrapper.html()).toContain('data-mod="code"')
  })
})

describe('dist useStrapiBlocksContext', () => {
  it('provides context to nested components', () => {
    const NestedComponent = defineComponent({
      setup() {
        const context = useStrapiBlocksContext()
        return () => h('div', { 'data-testid': 'nested', 'data-has-blocks': !!context.blocks })
      },
    })

    const wrapper = mount(StrapiBlocks, {
      props: {
        content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Test' }] }] as BlocksContent,
        blocks: {
          paragraph: (props) => h('p', {}, [props.children, h(NestedComponent)]),
        },
      },
    })

    expect(wrapper.find('[data-testid="nested"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="nested"]').attributes('data-has-blocks')).toBe('true')
  })

  it('throws error when used outside BlocksRenderer', () => {
    const BadComponent = defineComponent({
      setup() {
        useStrapiBlocksContext()
        return () => h('div')
      },
    })

    expect(() => mount(BadComponent)).toThrowError('useStrapiBlocksContext must be used within a BlocksRenderer')
  })

  it('provides access to blocks and modifiers from context', () => {
    const ContextInspector = defineComponent({
      setup() {
        const context = useStrapiBlocksContext()
        return () =>
          h('div', {
            'data-testid': 'inspector',
            'data-has-blocks': !!context.blocks,
            'data-has-modifiers': !!context.modifiers,
            'data-blocks-count': Object.keys(context.blocks).length,
            'data-modifiers-count': Object.keys(context.modifiers).length,
          })
      },
    })

    const wrapper = mount(StrapiBlocks, {
      props: {
        content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Test' }] }] as BlocksContent,
        blocks: {
          paragraph: (props) => h('p', {}, [props.children, h(ContextInspector)]),
        },
      },
    })

    const inspector = wrapper.find('[data-testid="inspector"]')
    expect(inspector.attributes('data-has-blocks')).toBe('true')
    expect(inspector.attributes('data-has-modifiers')).toBe('true')
    expect(Number(inspector.attributes('data-blocks-count'))).toBeGreaterThan(0)
    expect(Number(inspector.attributes('data-modifiers-count'))).toBeGreaterThan(0)
  })
})

describe('dist type exports', () => {
  // These tests verify that types are properly exported and usable
  it('BlocksContent type works', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'test' }] },
    ]
    expect(content).toBeDefined()
  })

  it('RootNode type works', () => {
    const node: RootNode = { type: 'paragraph', children: [{ type: 'text', text: 'test' }] }
    expect(node).toBeDefined()
  })

  it('BlocksRendererProps type works', () => {
    const props: BlocksRendererProps = {
      content: [{ type: 'paragraph', children: [{ type: 'text', text: 'test' }] }],
    }
    expect(props).toBeDefined()
  })

  it('BlockChildren type works', () => {
    const children: BlockChildren = ['test', h('span', 'child')]
    expect(children).toBeDefined()
  })

  it('ModifierChildrenProps type works', () => {
    const props: ModifierChildrenProps = {
      children: ['test'],
    }
    expect(props).toBeDefined()
  })

  it('BlocksComponents type is usable for custom blocks', () => {
    const customBlocks: Partial<BlocksComponents> = {
      paragraph: (props) => h('p', {}, props.children),
    }
    expect(customBlocks).toBeDefined()
  })

  it('ModifiersComponents type is usable for custom modifiers', () => {
    const customModifiers: Partial<ModifiersComponents> = {
      bold: (props) => h('strong', {}, props.children),
    }
    expect(customModifiers).toBeDefined()
  })
})

describe('dist nested list rendering', () => {
  it('renders nested ordered lists', () => {
    const nestedListContent: BlocksContent = [
      {
        type: 'list',
        format: 'ordered',
        children: [
          { type: 'list-item', children: [{ type: 'text', text: 'Level 1' }] },
          {
            type: 'list',
            format: 'ordered',
            children: [
              { type: 'list-item', children: [{ type: 'text', text: 'Level 2' }] },
            ],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: nestedListContent } })
    expect(wrapper.html()).toContain('<ol>')
    expect(wrapper.html()).toContain('Level 1')
    expect(wrapper.html()).toContain('Level 2')
    // Should have nested ol elements
    expect((wrapper.html().match(/<ol>/g) || []).length).toBe(2)
  })

  it('renders nested unordered lists', () => {
    const nestedListContent: BlocksContent = [
      {
        type: 'list',
        format: 'unordered',
        children: [
          { type: 'list-item', children: [{ type: 'text', text: 'Item A' }] },
          {
            type: 'list',
            format: 'unordered',
            children: [
              { type: 'list-item', children: [{ type: 'text', text: 'Item B' }] },
            ],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: nestedListContent } })
    expect(wrapper.html()).toContain('<ul>')
    expect(wrapper.html()).toContain('Item A')
    expect(wrapper.html()).toContain('Item B')
  })
})

describe('dist link rendering', () => {
  it('renders link with all attributes', () => {
    const linkContent: BlocksContent = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://example.com',
            target: '_blank',
            rel: 'noopener',
            children: [{ type: 'text', text: 'Link text' }],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: linkContent } })
    expect(wrapper.html()).toContain('href="https://example.com"')
    expect(wrapper.html()).toContain('target="_blank"')
    expect(wrapper.html()).toContain('rel="noopener"')
    expect(wrapper.html()).toContain('Link text')
  })

  it('renders link without optional attributes', () => {
    const linkContent: BlocksContent = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://simple.com',
            children: [{ type: 'text', text: 'Simple link' }],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: linkContent } })
    expect(wrapper.html()).toContain('href="https://simple.com"')
    expect(wrapper.html()).toContain('Simple link')
    expect(wrapper.html()).not.toContain('target=')
    expect(wrapper.html()).not.toContain('rel=')
  })
})
