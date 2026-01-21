import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { ComponentsContextValue } from './types'

import { name } from '../package.json'

/**
 * Injection key for the Strapi blocks components context.
 * Used internally by BlocksRenderer to provide context to nested components.
 */
export const contextKey: InjectionKey<ComponentsContextValue> = Symbol(name)

/**
 * Composable to access the Strapi blocks context from within custom components.
 * Provides access to blocks, modifiers, and missing type trackers.
 *
 * @returns The components context value
 * @throws Error if used outside of a BlocksRenderer
 *
 * @example
 * ```vue
 * <script setup>
 * import { useStrapiBlocksContext } from 'vue-strapi-blocks-renderer'
 *
 * const { blocks, modifiers } = useStrapiBlocksContext()
 * </script>
 * ```
 */
export function useStrapiBlocksContext(): ComponentsContextValue {
  const context = inject(contextKey)
  if (!context) {
    throw new Error(`[${name}] useStrapiBlocksContext must be used within a BlocksRenderer`)
  }
  return context
}
