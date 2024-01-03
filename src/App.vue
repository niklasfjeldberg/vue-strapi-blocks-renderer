<template>
  <div class="mx-auto max-w-[800px] border-2">
    <StrapiBlocks :content="data as BlocksContent" />
  </div>
</template>

<script setup lang="ts">
import data from '../data/data.json';
import { StrapiBlocks, type BlocksContent } from '../lib/index';
</script>
