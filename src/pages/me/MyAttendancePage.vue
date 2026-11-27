<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { LogIn, LogOut, UserCheck, Clock, FileText, UserX } from 'lucide-vue-next'
import BaseCard from '../../components/ui/BaseCard.vue'
import StatCard from '../../components/ui/StatCard.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { useAuthStore } from '../../stores/auth'
import { myAttendanceService } from '../../services/myAttendanceService'
import { formatDate, formatClock } from '../../utils/format'

const auth = useAuthStore()

const now = ref(new Date())
let timer
const today = ref(null)
const history = ref([])
const loading = ref(true)
const acting = ref(false)

const columns = [
  { key: 'date', label: 'Tanggal' },
  { key: 'checkIn', label: 'Masuk' },
  { key: 'checkOut', label: 'Pulang' },
  { key: 'status', label: 'Status' },
]

const dateLabel = computed(() =>
  now.value.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
)

const hasCheckedIn = computed(() => !!today.value)
const hasCheckedOut = computed(() => !!today.value && today.value.checkOut !== '-')

const statusText = computed(() => {
  if (!hasCheckedIn.value) return 'Belum absen'
  if (hasCheckedOut.value) return 'Hari ini selesai'
  return 'Sedang bekerja'
})

const duration = computed(() => {
  if (!hasCheckedOut.value) return '-'
  const [h1, m1] = today.value.checkIn.split(':').map(Number)
  const [h2, m2] = today.value.checkOut.split(':').map(Number)
  const mins = h2 * 60 + m2 - (h1 * 60 + m1)
  return mins > 0 ? `${Math.floor(mins / 60)}j ${mins % 60}m` : '-'
})

const count = (status) => history.value.filter((r) => r.status === status).length
const recent = computed(() => history.value.slice(0, 5))

async function load() {
  loading.value = true
  ;[today.value, history.value] = await Promise.all([
    myAttendanceService.getToday(),
    myAttendanceService.getHistory(),
  ])
  loading.value = false
}

async function checkIn() {
  acting.value = true
  await myAttendanceService.checkIn()
  await load()
  acting.value = false
}

async function checkOut() {
  acting.value = true
  await myAttendanceService.checkOut()
  await load()
  acting.value = false
}

onMounted(() => {
  load()
  timer = setInterval(() => (now.value = new Date()), 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <!-- Kartu absen -->
  <section class="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white shadow-card sm:p-6">
    <p class="text-sm text-white/80">Halo, {{ auth.user?.name }}</p>
    <p class="mt-0.5 text-sm font-medium">{{ dateLabel }}</p>

    <p class="mt-4 text-4xl font-bold tabular-nums sm:text-5xl">{{ formatClock(now) }}</p>

    <span class="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
      {{ statusText }}
    </span>

    <div class="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
      <button
        class="btn !min-h-14 !bg-white !text-base !text-brand-700 hover:!bg-brand-50"
        :disabled="hasCheckedIn || acting || loading"
        @click="checkIn"
      >
        <LogIn class="h-5 w-5" /> Absen Masuk
      </button>
      <button
        class="btn !min-h-14 !bg-white/15 !text-base !text-white ring-1 ring-white/30 hover:!bg-white/25"
        :disabled="!hasCheckedIn || hasCheckedOut || acting || loading"
        @click="checkOut"
      >
        <LogOut class="h-5 w-5" /> Absen Pulang
      </button>
    </div>

    <div class="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
      <div class="rounded-xl bg-white/10 p-3">
        <p class="text-xs text-white/70">Jam masuk</p>
        <p class="mt-0.5 text-base font-bold tabular-nums sm:text-lg">{{ today?.checkIn ?? '-' }}</p>
      </div>
      <div class="rounded-xl bg-white/10 p-3">
        <p class="text-xs text-white/70">Jam pulang</p>
        <p class="mt-0.5 text-base font-bold tabular-nums sm:text-lg">{{ hasCheckedOut ? today.checkOut : '-' }}</p>
      </div>
      <div class="rounded-xl bg-white/10 p-3">
        <p class="text-xs text-white/70">Durasi</p>
        <p class="mt-0.5 text-base font-bold sm:text-lg">{{ duration }}</p>
      </div>
    </div>
  </section>

  <!-- Ringkasan kehadiranku -->
  <div class="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
    <StatCard title="Hadir" :value="count('Hadir')" :icon="UserCheck" tone="success" />
    <StatCard title="Terlambat" :value="count('Terlambat')" :icon="Clock" tone="warning" />
    <StatCard title="Izin" :value="count('Izin')" :icon="FileText" tone="info" />
    <StatCard title="Alpha" :value="count('Alpha')" :icon="UserX" tone="brand" />
  </div>

  <BaseCard title="Absensi Terakhir" class="mt-6">
    <DataTable :columns="columns" :rows="recent" :loading="loading">
      <template #cell-date="{ value }">{{ formatDate(value) }}</template>
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
    <RouterLink to="/me/history" class="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
      Lihat semua riwayat
    </RouterLink>
  </BaseCard>
</template>
