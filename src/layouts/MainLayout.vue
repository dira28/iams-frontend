<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

watch(() => route.fullPath, () => (sidebarOpen.value = false))
watch(sidebarOpen, (v) => document.body.classList.toggle('overflow-hidden', v))
onBeforeUnmount(() => document.body.classList.remove('overflow-hidden'))
</script>

<template>
  <div class="min-h-dvh">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex min-h-dvh flex-col lg:pl-64">
      <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="page flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>
