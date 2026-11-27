<script setup>
import { computed, ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps({
  label: String,
  type: { type: String, default: 'text' },
  as: { type: String, default: 'input' }, // input | select
  placeholder: String,
  error: String,
})
const model = defineModel()

// Ikon mata otomatis muncul untuk type="password"
const show = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && show.value ? 'text' : props.type))
</script>

<template>
  <div>
    <label v-if="label" class="field-label">{{ label }}</label>

    <select v-if="as === 'select'" v-model="model" class="input" :class="error && 'input-error'">
      <slot />
    </select>

    <div v-else class="relative">
      <input
        v-model="model"
        :type="inputType"
        :placeholder="placeholder"
        class="input"
        :class="[error && 'input-error', isPassword && '!pr-11']"
      />
      <button
        v-if="isPassword"
        type="button"
        class="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
        :aria-label="show ? 'Sembunyikan password' : 'Tampilkan password'"
        @click="show = !show"
      >
        <EyeOff v-if="show" class="h-5 w-5" />
        <Eye v-else class="h-5 w-5" />
      </button>
    </div>

    <p v-if="error" class="mt-1 text-xs text-rose-600">{{ error }}</p>
  </div>
</template>
