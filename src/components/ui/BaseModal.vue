<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'

defineProps({ title: String })
const open = defineModel({ type: Boolean, default: false })

const onKey = (e) => e.key === 'Escape' && (open.value = false)

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('overflow-hidden')
})
watch(open, (v) => document.body.classList.toggle('overflow-hidden', v))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal-backdrop" @click.self="open = false">
        <div class="modal-panel" role="dialog" aria-modal="true">
          <header class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
            <button class="btn btn-ghost btn-sm !min-h-9 !px-2" @click="open = false">
              <X class="h-5 w-5" />
            </button>
          </header>

          <div class="overflow-y-auto p-5"><slot /></div>

          <footer v-if="$slots.footer" class="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
