/**
 * Tests that verify the built package works correctly.
 * Run `pnpm build` before running these tests.
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

// Import from the built dist folder instead of source
import { StrapiBlocks, BlocksRenderer, useStrapiBlocksContext, contextKey, type BlocksContent } from '../dist/vue-strapi-blocks-renderer.mjs'
import data from '../data/data.json'

describe('dist build', () => {
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

  it('renders content correctly', () => {
    const wrapper = mount(StrapiBlocks, {
      props: {
        content: data as BlocksContent,
      },
    })

    expect(wrapper.html()).toContain('<h1>Header 1</h1>')
    expect(wrapper.html()).toContain('<p>')
    expect(wrapper.html()).toContain('<a ')
  })
})
