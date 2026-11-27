<script setup>
import { Loader2 } from 'lucide-vue-next'

defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | danger | ghost
  size: { type: String, default: 'md' },         // md | sm
  type: { type: String, default: 'button' },
  loading: Boolean,
  block: Boolean,
})
</script>

<template>
  <button
    :type="type"
    :disabled="loading"
    class="btn"
    :class="[`btn-${variant}`, size === 'sm' && 'btn-sm', block && 'w-full']"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
