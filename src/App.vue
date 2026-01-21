<template>
  <div class="mx-auto p-4 border-2 max-w-[800px]">
    <h2 class="mb-4 font-bold text-xl">
      Basic Usage
    </h2>
    <StrapiBlocks
      v-if="data"
      :content="data"
    />

    <hr class="my-8">

    <h2 class="mb-4 font-bold text-xl">
      With Custom Component Using Context
    </h2>
    <StrapiBlocks
      v-if="data"
      :content="contextExampleData"
      :blocks="{ paragraph: CustomParagraph }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { StrapiBlocks, useStrapiBlocksContext, type BlocksContent, type BlockChildren } from '../lib/index'

const data = ref<BlocksContent>()

import('../data/data.json').then(
  (m) => (data.value = m.default as BlocksContent),
)

// Example data for context demo
const contextExampleData: BlocksContent = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'This paragraph uses a custom component that accesses the context!' }],
  },
]

// Custom functional component that uses useStrapiBlocksContext
const CustomParagraph = (props: { children?: BlockChildren }) => {
  // Access the context to get available modifiers
  const context = useStrapiBlocksContext()
  const modifierCount = Object.keys(context.modifiers).length

  return h('p', {
    class: 'bg-blue-100 p-2 rounded',
  }, [
    props.children,
    h('span', { class: 'text-sm text-gray-500 block mt-1' },
      `(Context accessed: ${modifierCount} modifiers available)`),
  ])
}
</script>
