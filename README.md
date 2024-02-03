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

- No dependencies
- Utilizes Vue futures
- Custom block types and modifiers
- Works with other editors that Strapi Blocks
- Typescript support

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
npm install vue-strapi-blocks-renderer vue
```

## Basic usage

After fetching your Strapi content, you can use the BlocksRenderer component to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

```ts
import { StrapiBlocks, type BlocksContent } from 'vue-strapi-blocks-renderer';

// Content should come from your Strapi API
const content: BlocksContent = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph' }],
  },
];

const VNode = StrapiBlocks({ content: content });
```

```html
<template>
  <VNode />
</template>
```

Or

```ts
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
```

```html
<template>
  <StrapiBlocks :content="content" :modifiers="modifiers" :blocks="blocks" />
</template>
```

## Custom components

You can provide your own Vue components to the renderer, both for blocks and modifier. They will be merged with the default components, so you can override only the ones you need.

- Blocks are full-width elements, usually at the root of the content. The available options are:
  - paragraph
  - heading (receives `level`)
  - list (receives `format`)
  - quote
  - code (receives `plainText`)
  - image (receives `image`)
  - link (receives `url`)
- Modifiers are inline elements, used to change the appearance of fragments of text within a block. The available options are:
  - bold
  - italic
  - underline
  - strikethrough
  - code

To provide your own components, pass an object to the blocks and modifiers props of the renderer. For each type, the value should be a React component that will receive the props of the block or modifier. Make sure to always render the children, so that the nested blocks and modifiers are rendered as well.

```ts
import { h } from 'vue';

import {
  StrapiBlocks,
  type BlocksComponents,
  type ModifiersComponents,
} from 'vue-strapi-blocks-renderer';

const userBlocks: BlocksComponents = {
  // Will include the class "mb-4" on all paragraphs
  paragraph: (props) => h('p', { class: 'mb-4' }, props.children),
};

const userModifier: ModifiersComponents = {
  // Will include the class "text-red" on all bold text
  bold: (props) => h('strong', { class: 'text-red' }, props.children),
};

const VNode = StrapiBlocks({
  content: content,
  modifier: userModifier,
  blocks: userBlocks,
});
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-strapi-blocks-renderer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[license-src]: https://img.shields.io/npm/l/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
