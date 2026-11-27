import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '../services/authService'

const KEY = 'iams_user'

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(readUser())

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const roleLabel = computed(() => (isAdmin.value ? 'Administrator' : 'Peserta Magang'))

  async function login(payload) {
    user.value = await authService.login(payload)
    localStorage.setItem(KEY, JSON.stringify(user.value))
    return user.value
  }

  function logout() {
    user.value = null
    localStorage.removeItem(KEY)
  }

  return { user, isLoggedIn, isAdmin, roleLabel, login, logout }
})
