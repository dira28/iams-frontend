<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next'
import { menusByRole } from '../../data/menuData'
import { useAuthStore } from '../../stores/auth'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const auth = useAuthStore()
const router = useRouter()
const menus = computed(() => menusByRole[auth.user?.role] ?? [])

function logout() {
  emit('close')
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
    @click="emit('close')"
  />

  <aside class="sidebar" :class="open ? 'translate-x-0' : 'max-lg:-translate-x-full'">
    <div class="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-6">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">I</div>
      <span class="text-lg font-bold text-slate-800">IAMS</span>
    </div>

    <!-- overflow-y-auto: menu tetap bisa di-scroll di layar pendek (HP landscape) -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-4">
      <RouterLink
        v-for="menu in menus"
        :key="menu.to"
        :to="menu.to"
        class="nav-link"
        :active-class="menu.exact ? '' : 'nav-link-active'"
        exact-active-class="nav-link-active"
        @click="emit('close')"
      >
        <component :is="menu.icon" class="h-5 w-5" />
        {{ menu.label }}
      </RouterLink>
    </nav>

    <div class="shrink-0 border-t border-slate-100 p-4">
      <button class="nav-link w-full" @click="logout">
        <LogOut class="h-5 w-5" />
        Keluar
      </button>
    </div>
  </aside>
</template>
