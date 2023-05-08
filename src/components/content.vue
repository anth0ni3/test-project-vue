<template>
  <div class="content" ref="content">
    <span class="label">Content Box</span>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useDrag} from '../hooks/use-drag';

const content = ref<HTMLElement | null>(null);

onMounted(() => {
  useDrag({target: content, constraint: '.container'});
});
</script>

<style lang="postcss" scoped>
.content {
  @apply bg-black h-24 w-36 relative;
}
.label {
  @apply absolute -top-3 px-3 left-0 bg-black text-white text-xs;
}
</style>
