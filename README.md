# Vue Strapi Blocks Renderer

Easily render the content of Strapi's new Blocks rich text editor in your Vue frontend.

Based on [@strapi/blocks-react-renderer](https://github.com/strapi/blocks-react-renderer)

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
npm install strapi-blocks-vue-renderer vue
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
