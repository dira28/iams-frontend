<script setup>
import { onMounted, ref } from 'vue'
import { Users, UserCheck, Clock, FileText } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import StatCard from '../../components/ui/StatCard.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { dashboardService } from '../../services/dashboardService'
import { formatDate } from '../../utils/format'

const loading = ref(true)
const summary = ref({ total: 0, hadir: 0, terlambat: 0, izin: 0, recent: [] })

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'date', label: 'Tanggal' },
  { key: 'checkIn', label: 'Masuk' },
  { key: 'status', label: 'Status' },
]

onMounted(async () => {
  summary.value = await dashboardService.getSummary()
  loading.value = false
})
</script>

<template>
  <PageHeader title="Dashboard" subtitle="Ringkasan absensi peserta magang" />

  <div class="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
    <StatCard title="Total Data" :value="summary.total" :icon="Users" tone="brand" />
    <StatCard title="Hadir" :value="summary.hadir" :icon="UserCheck" tone="success" />
    <StatCard title="Terlambat" :value="summary.terlambat" :icon="Clock" tone="warning" />
    <StatCard title="Izin" :value="summary.izin" :icon="FileText" tone="info" />
  </div>

  <BaseCard title="Absensi Terbaru" class="mt-6">
    <DataTable :columns="columns" :rows="summary.recent" :loading="loading">
      <template #cell-date="{ value }">{{ formatDate(value) }}</template>
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
  </BaseCard>
</template>
