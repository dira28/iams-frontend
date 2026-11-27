<script setup>
import { computed, onMounted, ref } from 'vue'
import PageHeader from '../../components/ui/PageHeader.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { myAttendanceService } from '../../services/myAttendanceService'
import { formatDate } from '../../utils/format'

const columns = [
  { key: 'date', label: 'Tanggal' },
  { key: 'checkIn', label: 'Masuk' },
  { key: 'checkOut', label: 'Pulang' },
  { key: 'status', label: 'Status' },
]

const rows = ref([])
const loading = ref(true)
const month = ref('') // format YYYY-MM
const statusFilter = ref('')

const filtered = computed(() =>
  rows.value.filter((r) => {
    const matchMonth = !month.value || r.date.startsWith(month.value)
    const matchStatus = !statusFilter.value || r.status === statusFilter.value
    return matchMonth && matchStatus
  }),
)

onMounted(async () => {
  rows.value = await myAttendanceService.getHistory()
  loading.value = false
})
</script>

<template>
  <PageHeader title="Riwayat Saya" subtitle="Seluruh riwayat absensimu" />

  <BaseCard>
    <div class="mb-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
      <BaseInput v-model="month" label="Bulan" type="month" />
      <BaseInput v-model="statusFilter" label="Status" as="select">
        <option value="">Semua status</option>
        <option>Hadir</option>
        <option>Terlambat</option>
        <option>Izin</option>
        <option>Alpha</option>
      </BaseInput>
    </div>

    <DataTable :columns="columns" :rows="filtered" :loading="loading" empty-text="Tidak ada riwayat">
      <template #cell-date="{ value }">{{ formatDate(value) }}</template>
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
  </BaseCard>
</template>
