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

// Import runtime values from the built dist folder
import {
  StrapiBlocks,
  BlocksRenderer,
  useStrapiBlocksContext,
  contextKey,
} from '../dist/vue-strapi-blocks-renderer.mjs'

// Import types from source (types are compile-time only, don't affect runtime testing)
import type {
  BlocksContent,
  BlocksComponents,
  ModifiersComponents,
  BlockChildren,
  RootNode,
  ModifierChildrenProps,
  BlocksRendererProps,
} from '../lib'

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
  it('h1 renders as h1 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 1, children: [{ type: 'text', text: 'Header 1' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('Header 1')
    expect(wrapper.findAll('h2, h3, h4, h5, h6').length).toBe(0)
  })

  it('h2 renders as h2 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 2, children: [{ type: 'text', text: 'Header 2' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(true)
    expect(h2.text()).toBe('Header 2')
    expect(wrapper.findAll('h1, h3, h4, h5, h6').length).toBe(0)
  })

  it('h3 renders as h3 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 3, children: [{ type: 'text', text: 'Header 3' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h3 = wrapper.find('h3')
    expect(h3.exists()).toBe(true)
    expect(h3.text()).toBe('Header 3')
  })

  it('h4 renders as h4 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 4, children: [{ type: 'text', text: 'Header 4' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h4 = wrapper.find('h4')
    expect(h4.exists()).toBe(true)
    expect(h4.text()).toBe('Header 4')
  })

  it('h5 renders as h5 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 5, children: [{ type: 'text', text: 'Header 5' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h5 = wrapper.find('h5')
    expect(h5.exists()).toBe(true)
    expect(h5.text()).toBe('Header 5')
  })

  it('h6 renders as h6 element with correct text', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 6, children: [{ type: 'text', text: 'Header 6' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const h6 = wrapper.find('h6')
    expect(h6.exists()).toBe(true)
    expect(h6.text()).toBe('Header 6')
  })

  it('paragraph renders as p element with correct text', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Normal text.' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Normal text.')
  })

  it('bold text renders strong inside p', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Bold text', bold: true }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const strong = p.find('strong')
    expect(strong.exists()).toBe(true)
    expect(strong.text()).toBe('Bold text')
  })

  it('italic text renders em inside p', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Italic text', italic: true }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const em = p.find('em')
    expect(em.exists()).toBe(true)
    expect(em.text()).toBe('Italic text')
  })

  it('underlined text renders u inside p', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Underlined text', underline: true }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const u = p.find('u')
    expect(u.exists()).toBe(true)
    expect(u.text()).toBe('Underlined text')
  })

  it('strikethrough text renders del inside p', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Deleted text', strikethrough: true }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const del = p.find('del')
    expect(del.exists()).toBe(true)
    expect(del.text()).toBe('Deleted text')
  })

  it('combined modifiers nest correctly: del > u > em > strong', () => {
    const content: BlocksContent = [
      {
        type: 'paragraph',
        children: [{
          type: 'text',
          text: 'All modifiers',
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
        }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const del = p.find('del')
    const u = del.find('u')
    const em = u.find('em')
    const strong = em.find('strong')
    expect(del.exists()).toBe(true)
    expect(u.exists()).toBe(true)
    expect(em.exists()).toBe(true)
    expect(strong.exists()).toBe(true)
    expect(strong.text()).toBe('All modifiers')
  })

  it('link renders as a element with correct href and text', () => {
    const content: BlocksContent = [
      {
        type: 'paragraph',
        children: [{
          type: 'link',
          url: 'https://google.com',
          children: [{ type: 'text', text: 'Link text' }],
        }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const a = wrapper.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('https://google.com')
    expect(a.text()).toBe('Link text')
  })

  it('link with target and rel renders all attributes correctly', () => {
    const content: BlocksContent = [
      {
        type: 'paragraph',
        children: [{
          type: 'link',
          url: 'https://external.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          children: [{ type: 'text', text: 'External link' }],
        }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const a = wrapper.find('a')
    expect(a.attributes('href')).toBe('https://external.com')
    expect(a.attributes('target')).toBe('_blank')
    expect(a.attributes('rel')).toBe('noopener noreferrer')
  })

  it('inline code renders code element inside p', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Code string', code: true }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    const code = p.find('code')
    expect(code.exists()).toBe(true)
    expect(code.text()).toBe('Code string')
  })

  it('code block renders pre > code structure', () => {
    const content: BlocksContent = [
      { type: 'code', children: [{ type: 'text', text: 'Code block content' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const pre = wrapper.find('pre')
    expect(pre.exists()).toBe(true)
    const code = pre.find('code')
    expect(code.exists()).toBe(true)
    expect(code.text()).toBe('Code block content')
  })

  it('ordered list renders ol with li children', () => {
    const content: BlocksContent = [
      {
        type: 'list',
        format: 'ordered',
        children: [
          { type: 'list-item', children: [{ type: 'text', text: 'Item 1' }] },
          { type: 'list-item', children: [{ type: 'text', text: 'Item 2' }] },
        ],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const ol = wrapper.find('ol')
    expect(ol.exists()).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(false)
    const items = ol.findAll('li')
    expect(items.length).toBe(2)
    expect(items[0]!.text()).toBe('Item 1')
    expect(items[1]!.text()).toBe('Item 2')
  })

  it('unordered list renders ul with li children', () => {
    const content: BlocksContent = [
      {
        type: 'list',
        format: 'unordered',
        children: [
          { type: 'list-item', children: [{ type: 'text', text: 'Item A' }] },
          { type: 'list-item', children: [{ type: 'text', text: 'Item B' }] },
        ],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const ul = wrapper.find('ul')
    expect(ul.exists()).toBe(true)
    expect(wrapper.find('ol').exists()).toBe(false)
    const items = ul.findAll('li')
    expect(items.length).toBe(2)
    expect(items[0]!.text()).toBe('Item A')
    expect(items[1]!.text()).toBe('Item B')
  })

  it('quote renders as blockquote element', () => {
    const content: BlocksContent = [
      { type: 'quote', children: [{ type: 'text', text: 'Quote text' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const blockquote = wrapper.find('blockquote')
    expect(blockquote.exists()).toBe(true)
    expect(blockquote.text()).toBe('Quote text')
  })

  it('image renders as img with correct src and alt', () => {
    const content: BlocksContent = [
      {
        type: 'image',
        image: {
          url: 'https://example.com/image.jpg',
          alternativeText: 'Alt text',
          name: 'image.jpg',
          width: 100,
          height: 100,
          hash: 'abc',
          ext: '.jpg',
          mime: 'image/jpeg',
          size: 1000,
          provider: 'local',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        children: [{ type: 'text', text: '' }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Alt text')
  })

  it('image without alt does not have alt attribute', () => {
    const content: BlocksContent = [
      {
        type: 'image',
        image: {
          url: 'https://example.com/noalt.jpg',
          name: 'noalt.jpg',
          width: 100,
          height: 100,
          hash: 'abc',
          ext: '.jpg',
          mime: 'image/jpeg',
          size: 1000,
          provider: 'local',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        children: [{ type: 'text', text: '' }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/noalt.jpg')
    expect(img.attributes('alt')).toBeUndefined()
  })

  it('false modifiers do not render modifier elements', () => {
    const content: BlocksContent = [
      {
        type: 'paragraph',
        children: [{
          type: 'text',
          text: 'Plain text',
          bold: false,
          italic: false,
          underline: false,
          strikethrough: false,
          code: false,
        }],
      },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    const p = wrapper.find('p')
    expect(p.text()).toBe('Plain text')
    expect(p.find('strong').exists()).toBe(false)
    expect(p.find('em').exists()).toBe(false)
    expect(p.find('u').exists()).toBe(false)
    expect(p.find('del').exists()).toBe(false)
    expect(p.find('code').exists()).toBe(false)
  })

  it('empty paragraph renders as br element (not wrapped in p)', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: '' }] },
    ]
    const wrapper = mount(StrapiBlocks, { props: { content } })
    // Empty paragraph renders directly as <br>, not <p><br></p>
    const br = wrapper.find('br')
    expect(br.exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(false)
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
  it('renders custom block component with correct class', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Test' }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          paragraph: (props) => h('p', { class: 'custom-paragraph' }, props.children),
        },
      },
    })
    const p = wrapper.find('p.custom-paragraph')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Test')
  })

  it('renders custom modifier component with correct class', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Code', code: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          code: (props) => h('code', { class: 'custom-code' }, props.children),
        },
      },
    })
    const code = wrapper.find('code.custom-code')
    expect(code.exists()).toBe(true)
    expect(code.text()).toBe('Code')
  })

  it('custom paragraph replaces default paragraph', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Para' }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          paragraph: (props) => h('div', { 'data-block': 'paragraph' }, props.children),
        },
      },
    })
    const customPara = wrapper.find('[data-block="paragraph"]')
    expect(customPara.exists()).toBe(true)
    expect(customPara.element.tagName).toBe('DIV')
    expect(customPara.text()).toBe('Para')
  })

  it('custom heading receives level prop correctly', () => {
    const content: BlocksContent = [
      { type: 'heading', level: 2, children: [{ type: 'text', text: 'Head' }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          heading: (props) => h('div', { 'data-block': 'heading', 'data-level': props.level }, props.children),
        },
      },
    })
    const customHeading = wrapper.find('[data-block="heading"]')
    expect(customHeading.exists()).toBe(true)
    expect(customHeading.attributes('data-level')).toBe('2')
    expect(customHeading.text()).toBe('Head')
  })

  it('custom quote replaces default blockquote', () => {
    const content: BlocksContent = [
      { type: 'quote', children: [{ type: 'text', text: 'Quote' }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          quote: (props) => h('div', { 'data-block': 'quote' }, props.children),
        },
      },
    })
    const customQuote = wrapper.find('[data-block="quote"]')
    expect(customQuote.exists()).toBe(true)
    expect(wrapper.find('blockquote').exists()).toBe(false)
    expect(customQuote.text()).toBe('Quote')
  })

  it('custom code block replaces default pre>code', () => {
    const content: BlocksContent = [
      { type: 'code', children: [{ type: 'text', text: 'Code' }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          code: (props) => h('div', { 'data-block': 'code' }, props.children),
        },
      },
    })
    const customCode = wrapper.find('[data-block="code"]')
    expect(customCode.exists()).toBe(true)
    expect(wrapper.find('pre').exists()).toBe(false)
    expect(customCode.text()).toBe('Code')
  })

  it('custom list receives format prop correctly', () => {
    const content: BlocksContent = [
      { type: 'list', format: 'unordered', children: [{ type: 'list-item', children: [{ type: 'text', text: 'Item' }] }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        blocks: {
          list: (props) => h('div', { 'data-block': 'list', 'data-format': props.format }, props.children),
        },
      },
    })
    const customList = wrapper.find('[data-block="list"]')
    expect(customList.exists()).toBe(true)
    expect(customList.attributes('data-format')).toBe('unordered')
  })

  it('custom bold modifier replaces default strong', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Bold', bold: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          bold: (props) => h('span', { 'data-mod': 'bold' }, props.children),
        },
      },
    })
    const customBold = wrapper.find('[data-mod="bold"]')
    expect(customBold.exists()).toBe(true)
    expect(wrapper.find('strong').exists()).toBe(false)
    expect(customBold.text()).toBe('Bold')
  })

  it('custom italic modifier replaces default em', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Italic', italic: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          italic: (props) => h('span', { 'data-mod': 'italic' }, props.children),
        },
      },
    })
    const customItalic = wrapper.find('[data-mod="italic"]')
    expect(customItalic.exists()).toBe(true)
    expect(wrapper.find('em').exists()).toBe(false)
    expect(customItalic.text()).toBe('Italic')
  })

  it('custom underline modifier replaces default u', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Underline', underline: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          underline: (props) => h('span', { 'data-mod': 'underline' }, props.children),
        },
      },
    })
    const customUnderline = wrapper.find('[data-mod="underline"]')
    expect(customUnderline.exists()).toBe(true)
    expect(wrapper.find('u').exists()).toBe(false)
    expect(customUnderline.text()).toBe('Underline')
  })

  it('custom strikethrough modifier replaces default del', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Strike', strikethrough: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          strikethrough: (props) => h('span', { 'data-mod': 'strikethrough' }, props.children),
        },
      },
    })
    const customStrike = wrapper.find('[data-mod="strikethrough"]')
    expect(customStrike.exists()).toBe(true)
    expect(wrapper.find('del').exists()).toBe(false)
    expect(customStrike.text()).toBe('Strike')
  })

  it('custom code modifier replaces default inline code', () => {
    const content: BlocksContent = [
      { type: 'paragraph', children: [{ type: 'text', text: 'Code', code: true }] },
    ]
    const wrapper = mount(StrapiBlocks, {
      props: {
        content,
        modifiers: {
          code: (props) => h('span', { 'data-mod': 'code' }, props.children),
        },
      },
    })
    const customCode = wrapper.find('[data-mod="code"]')
    expect(customCode.exists()).toBe(true)
    expect(customCode.text()).toBe('Code')
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
  it('renders nested ordered lists with correct structure', () => {
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
    const topLevelOl = wrapper.find('ol')
    expect(topLevelOl.exists()).toBe(true)

    // First li should have "Level 1" text
    const firstLi = topLevelOl.find('li')
    expect(firstLi.exists()).toBe(true)
    expect(firstLi.text()).toContain('Level 1')

    // Should have a nested ol
    const nestedOl = topLevelOl.find('ol ol')
    expect(nestedOl.exists()).toBe(true)

    // Nested ol should have "Level 2" in its li
    const nestedLi = nestedOl.find('li')
    expect(nestedLi.text()).toBe('Level 2')

    // Should have exactly 2 ol elements total
    expect(wrapper.findAll('ol').length).toBe(2)
  })

  it('renders nested unordered lists with correct structure', () => {
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
    const topLevelUl = wrapper.find('ul')
    expect(topLevelUl.exists()).toBe(true)
    expect(wrapper.find('ol').exists()).toBe(false)

    const nestedUl = topLevelUl.find('ul ul')
    expect(nestedUl.exists()).toBe(true)

    const nestedLi = nestedUl.find('li')
    expect(nestedLi.text()).toBe('Item B')
  })

  it('renders mixed nested lists (ordered inside unordered)', () => {
    const mixedListContent: BlocksContent = [
      {
        type: 'list',
        format: 'unordered',
        children: [
          { type: 'list-item', children: [{ type: 'text', text: 'Unordered' }] },
          {
            type: 'list',
            format: 'ordered',
            children: [
              { type: 'list-item', children: [{ type: 'text', text: 'Ordered' }] },
            ],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: mixedListContent } })
    const ul = wrapper.find('ul')
    expect(ul.exists()).toBe(true)

    const nestedOl = ul.find('ol')
    expect(nestedOl.exists()).toBe(true)
    expect(nestedOl.find('li').text()).toBe('Ordered')
  })
})

describe('dist link rendering', () => {
  it('renders link with all attributes in correct element', () => {
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
    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)

    const a = p.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('https://example.com')
    expect(a.attributes('target')).toBe('_blank')
    expect(a.attributes('rel')).toBe('noopener')
    expect(a.text()).toBe('Link text')
  })

  it('renders link without optional attributes correctly', () => {
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
    const a = wrapper.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('https://simple.com')
    expect(a.text()).toBe('Simple link')
    expect(a.attributes('target')).toBeUndefined()
    expect(a.attributes('rel')).toBeUndefined()
  })

  it('link is rendered inside paragraph, not as sibling', () => {
    const linkContent: BlocksContent = [
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'Before ' },
          {
            type: 'link',
            url: 'https://test.com',
            children: [{ type: 'text', text: 'link' }],
          },
          { type: 'text', text: ' after' },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: linkContent } })
    const p = wrapper.find('p')
    const a = p.find('a')
    expect(a.exists()).toBe(true)
    expect(p.text()).toBe('Before link after')
  })

  it('link with styled text renders modifiers inside link', () => {
    const linkContent: BlocksContent = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://styled.com',
            children: [{ type: 'text', text: 'Bold link', bold: true }],
          },
        ],
      },
    ]

    const wrapper = mount(StrapiBlocks, { props: { content: linkContent } })
    const a = wrapper.find('a')
    expect(a.exists()).toBe(true)

    const strong = a.find('strong')
    expect(strong.exists()).toBe(true)
    expect(strong.text()).toBe('Bold link')
  })
})
