<template>
  <div class="container" ref="container" @mousedown.self="mousedown($event, container)">
    <span class="label">Container Box</span>
    <content />
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import content from './content.vue';

import {mousedown} from '../lib/mouse';

const container = ref<HTMLElement | null>(null);
</script>

<style lang="postcss" scoped>
.container {
  @apply w-96 h-80 bg-gray-300 flex items-center justify-center relative;
}

.label {
  @apply absolute -top-3 px-3 left-0 bg-gray-300 text-black text-xs;
}
</style>
