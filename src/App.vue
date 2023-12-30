<template>
  <div class="mx-auto max-w-[800px] border-2">
    <StrapiBlocks :content="data.text" />
  </div>
</template>

<script setup lang="ts">
import data from './data/data.json';
import { useStrapiBlocks as StrapiBlocks } from './composables';
</script>
