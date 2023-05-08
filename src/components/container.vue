<template>
  <div class="container" ref="container">
    <span class="label">Container Box</span>
    <content />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import content from './content.vue';
import {useDrag} from '../hooks/use-drag';

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  useDrag({target: container});
});
</script>

<style lang="postcss" scoped>
.container {
  @apply w-96 h-80 bg-gray-300 flex items-center justify-center relative;
}

.label {
  @apply absolute -top-3 px-3 left-0 bg-gray-300 text-black text-xs;
}
</style>
