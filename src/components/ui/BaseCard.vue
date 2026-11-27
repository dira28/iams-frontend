<script setup>
defineProps({ title: String })
</script>

<template>
  <section class="card">
    <header v-if="title || $slots.header" class="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
      <slot name="header">
        <h2 class="text-base font-semibold text-slate-800">{{ title }}</h2>
      </slot>
    </header>
    <div class="card-body">
      <slot />
    </div>
  </section>
</template>
