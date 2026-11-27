<script setup>
defineProps({ title: String, subtitle: String })
</script>

<template>
  <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-xl font-bold text-slate-800 sm:text-2xl">{{ title }}</h2>
      <p v-if="subtitle" class="mt-0.5 text-sm text-slate-500">{{ subtitle }}</p>
    </div>
    <div class="flex gap-2"><slot name="actions" /></div>
  </div>
</template>
