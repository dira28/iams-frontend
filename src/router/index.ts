import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '', name: 'login', component: () => import('../pages/auth/LoginPage.vue'), meta: { title: 'Masuk' } },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      // Admin
      { path: '', name: 'dashboard', component: () => import('../pages/dashboard/DashboardPage.vue'), meta: { title: 'Dashboard', role: 'admin' } },
      { path: 'attendance', name: 'attendance', component: () => import('../pages/attendance/AttendancePage.vue'), meta: { title: 'Absensi', role: 'admin' } },
      { path: 'users', name: 'users', component: () => import('../pages/users/UserPage.vue'), meta: { title: 'Kelola User', role: 'admin' } },
      // Peserta magang
      { path: 'me', name: 'me', component: () => import('../pages/me/MyAttendancePage.vue'), meta: { title: 'Absen Hari Ini', role: 'intern' } },
      { path: 'me/history', name: 'my-history', component: () => import('../pages/me/MyHistoryPage.vue'), meta: { title: 'Riwayat Saya', role: 'intern' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const home = auth.isAdmin ? { name: 'dashboard' } : { name: 'me' }

  if (to.name === 'login') return auth.isLoggedIn ? home : true
  if (!auth.isLoggedIn) return { name: 'login' }

  const role = to.meta.role
  if (role && role !== auth.user.role) return home
})

export default router
