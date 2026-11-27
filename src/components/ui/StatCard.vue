<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  tone: { type: String, default: 'brand' }, // brand | success | warning | info
})

const tones = {
  brand: 'bg-brand-50 text-brand-600',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  info: 'bg-sky-50 text-sky-600',
}
</script>

<template>
  <div class="card flex items-center gap-4 p-4 sm:p-5">
    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="tones[tone]">
      <component :is="icon" class="h-6 w-6" />
    </div>
    <div class="min-w-0">
      <p class="truncate text-sm text-slate-500">{{ title }}</p>
      <p class="text-2xl font-bold text-slate-800">{{ value }}</p>
    </div>
  </div>
</template>
