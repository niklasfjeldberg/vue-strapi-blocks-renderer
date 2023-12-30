# Vue Strapi Blocks Renderer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Easily render the content of Strapi's new Blocks rich text editor in your Vue frontend.

Based on [@strapi/blocks-react-renderer](https://github.com/strapi/blocks-react-renderer)

- ✨ [Release Notes](/CHANGELOG.md)
- 🏀 [Online playground](https://stackblitz.com/github/niklasfjeldberg/vue-strapi-blocks-renderer?file=src%2FApp.vue)

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
npm install vue-strapi-blocks-renderer vue
```

## Basic usage

After fetching your Strapi content, you can use the BlocksRenderer component to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

```ts
import {
  useStrapiBlocks,
  type BlocksContent,
} from 'strapi-blocks-vue-renderer';

// Content should come from your Strapi API
const content: BlocksContent = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph' }],
  },
];

const VNode = useStrapiBlocks({ content: content });
```

```html
<template>
  <VNode />
</template>
```

Or

```ts
import { useStrapiBlocks as StrapiBlocks } from 'strapi-blocks-vue-renderer';
```

```html
<template>
  <StrapiBlocks :content="content" :modifiers="modifiers" :blocks="blocks" />
</template>
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-strapi-blocks-renderer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
[license-src]: https://img.shields.io/npm/l/vue-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/vue-strapi-blocks-renderer
