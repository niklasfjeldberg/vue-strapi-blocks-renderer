# Vue Strapi Blocks Renderer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![codecov](https://codecov.io/gh/niklasfjeldberg/vue-strapi-blocks-renderer/graph/badge.svg?token=GU7ZGIRG0H)](https://codecov.io/gh/niklasfjeldberg/vue-strapi-blocks-renderer)
[![ci](https://github.com/niklasfjeldberg/vue-strapi-blocks-renderer/actions/workflows/ci.yml/badge.svg)](https://github.com/niklasfjeldberg/vue-strapi-blocks-renderer/actions/workflows/ci.yml)

Easily render the content of Strapi's new Blocks rich text editor in your Vue frontend.

Based on [@strapi/blocks-react-renderer](https://github.com/strapi/blocks-react-renderer)

- ✨ [Release Notes](/CHANGELOG.md)
- 👀 [Demo](https://reslear.github.io/vue-strapi-blocks-renderer-demo/)
- 🏀 [Online stackblitz playground](https://stackblitz.com/github/niklasfjeldberg/vue-strapi-blocks-renderer?file=src%2FApp.vue)

## Features

- Zero runtime dependencies
- Renders line breaks (`\n`) as `<br>` elements
- `plainText` prop available on `code` and `heading` blocks
- `useStrapiBlocksContext()` composable for nested custom components
- Custom block and modifier components
- Full TypeScript support
- Compatible with Nuxt

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
npm install vue-strapi-blocks-renderer vue
```

## Basic usage

After fetching your Strapi content, you can use the BlocksRenderer component to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

```vue
<script setup lang="ts">
import { StrapiBlocks, type BlocksContent } from 'vue-strapi-blocks-renderer'

// Content should come from your Strapi API
const content: BlocksContent = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph' }],
  },
]
</script>

<template>
  <StrapiBlocks :content="content" />
</template>
```

## Custom components

You can provide your own Vue components to the renderer, both for blocks and modifiers. They will be merged with the default components, so you can override only the ones you need.

- **Blocks** are full-width elements, usually at the root of the content:
  - `paragraph`
  - `heading` (receives `level`, `plainText`)
  - `list` (receives `format`)
  - `quote`
  - `code` (receives `plainText`)
  - `image` (receives `image`)
  - `link` (receives `url`, `target`, `rel`)
- **Modifiers** are inline elements for text formatting:
  - `bold`
  - `italic`
  - `underline`
  - `strikethrough`
  - `code`

To provide your own components, pass an object to the `blocks` and `modifiers` props. Each value should be a Vue render function that receives the props. Make sure to always render the children so nested content is displayed.

```vue
<script setup lang="ts">
import { h } from 'vue'
import {
  StrapiBlocks,
  type BlocksComponents,
  type ModifiersComponents,
  type BlocksContent,
} from 'vue-strapi-blocks-renderer'

const content: BlocksContent = [/* your content */]

const customBlocks: Partial<BlocksComponents> = {
  paragraph: (props) => h('p', { class: 'mb-4' }, props.children),
  heading: ({ level, plainText, children }) =>
    h(`h${level}`, { id: plainText?.toLowerCase().replace(/\s+/g, '-') }, children),
}

const customModifiers: Partial<ModifiersComponents> = {
  bold: (props) => h('strong', { class: 'font-bold text-blue-600' }, props.children),
}
</script>

<template>
  <StrapiBlocks :content="content" :blocks="customBlocks" :modifiers="customModifiers" />
</template>
```

## Accessing context in custom components

If you need to access the blocks/modifiers context from within a custom component, use the `useStrapiBlocksContext()` composable:

```ts
import { h } from 'vue'
import { useStrapiBlocksContext, type BlockChildren } from 'vue-strapi-blocks-renderer'

const CustomParagraph = (props: { children?: BlockChildren }) => {
  const { modifiers } = useStrapiBlocksContext()
  const modifierCount = Object.keys(modifiers).length

  return h('p', {}, [
    props.children,
    h('small', { class: 'text-gray-500' }, ` (${modifierCount} modifiers available)`),
  ])
}
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-strapi-blocks-renderer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[license-src]: https://img.shields.io/npm/l/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
