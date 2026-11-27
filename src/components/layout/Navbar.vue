<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const auth = useAuthStore()
const initial = computed(() => auth.user?.name?.charAt(0).toUpperCase() ?? '?')
</script>

<template>
  <header class="navbar">
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost !min-h-10 !px-2 lg:hidden" aria-label="Menu" @click="$emit('toggle-sidebar')">
        <Menu class="h-6 w-6" />
      </button>
      <h1 class="text-base font-semibold text-slate-800 sm:text-lg">{{ route.meta.title }}</h1>
    </div>

    <div class="flex items-center gap-3">
      <div class="hidden text-right sm:block">
        <p class="text-sm font-semibold text-slate-800">{{ auth.user?.name }}</p>
        <p class="text-xs text-slate-500">{{ auth.roleLabel }}</p>
      </div>
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">{{ initial }}</div>
    </div>
  </header>
</template>
