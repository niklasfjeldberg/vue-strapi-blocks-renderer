export { BlocksRenderer as StrapiBlocks } from './blocksRenderer';
export type {
  BlocksComponents,
  ModifiersComponents,
  BlocksContent,
} from './types';

// fix export types for vite-plugin-dts
import './types';
