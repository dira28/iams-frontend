import { LayoutDashboard, CalendarCheck, Users, Fingerprint, History } from 'lucide-vue-next'

export const adminMenus = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard, exact: true },
  { label: 'Absensi', to: '/attendance', icon: CalendarCheck },
  { label: 'Kelola User', to: '/users', icon: Users },
]

export const internMenus = [
  { label: 'Absen Hari Ini', to: '/me', icon: Fingerprint, exact: true },
  { label: 'Riwayat Saya', to: '/me/history', icon: History },
]

export const menusByRole = {
  admin: adminMenus,
  intern: internMenus,
}
