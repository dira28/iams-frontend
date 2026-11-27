<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)
const form = reactive({ email: '', password: '' })

const demoAccounts = [
  { label: 'Admin', email: 'admin@iams.test', password: 'password' },
  { label: 'Peserta Magang', email: 'andi@iams.test', password: 'password' },
]

async function submit() {
  loading.value = true
  const user = await auth.login({ email: form.email })
  loading.value = false
  router.push(user.role === 'admin' ? '/' : '/me')
}

function fillDemo(account) {
  form.email = account.email
  form.password = account.password
}
</script>

<template>
  <div class="card w-full max-w-md">
    <div class="card-body !p-6 sm:!p-8">
      <div class="mb-6 text-center">
        <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white">I</div>
        <h2 class="text-xl font-bold text-slate-800">Selamat datang</h2>
        <p class="mt-1 text-sm text-slate-500">Masuk ke Internship Attendance Management System</p>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <BaseInput v-model="form.email" label="Email" type="email" placeholder="nama@email.com" />
        <BaseInput v-model="form.password" label="Password" type="password" placeholder="Masukkan password" />
        <BaseButton type="submit" block :loading="loading">Masuk</BaseButton>
      </form>

      <!-- Hanya untuk tahap dummy, hapus saat login asli sudah terhubung -->
      <div class="mt-6 rounded-xl bg-slate-50 p-4">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Akun demo</p>
        <ul class="space-y-3">
          <li v-for="acc in demoAccounts" :key="acc.email" class="flex items-center justify-between gap-3">
            <div class="min-w-0 text-sm">
              <p class="font-medium text-slate-700">{{ acc.label }}</p>
              <p class="truncate text-xs text-slate-500">{{ acc.email }} / {{ acc.password }}</p>
            </div>
            <BaseButton variant="secondary" size="sm" @click="fillDemo(acc)">Isi</BaseButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
