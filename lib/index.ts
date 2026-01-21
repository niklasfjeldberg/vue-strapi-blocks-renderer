export { BlocksRenderer, BlocksRenderer as StrapiBlocks } from './blocksRenderer'
export { useStrapiBlocksContext, contextKey } from './context'
export type {
  BlockChildren,
  BlocksComponents,
  BlocksContent,
  BlocksRendererProps,
  ModifierChildrenProps,
  ModifiersComponents,
  RootNode,
} from './types'

// fix export types for vite-plugin-dts
import './types'
