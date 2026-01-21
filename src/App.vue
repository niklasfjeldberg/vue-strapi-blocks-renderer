<template>
  <div class="mx-auto max-w-[800px] border-2">
    <StrapiBlocks
      v-if="data"
      :content="data"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StrapiBlocks, type BlocksContent } from '../lib/index'

const data = ref<BlocksContent>()

import('../data/data.json').then(
  (m) => (data.value = m.default as BlocksContent),
)
</script>
