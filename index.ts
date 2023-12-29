// https://vuejs.org/guide/extras/render-function
// https://github.com/strapi/blocks-react-renderer

import { BlocksRenderer } from './src/composables/blocksRenderer';
export { BlocksRenderer as useStrapiBlocks };

import type { RootNode } from './src/types';
export type BlocksContent = RootNode[];
