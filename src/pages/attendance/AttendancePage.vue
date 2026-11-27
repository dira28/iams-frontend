<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Plus, Search, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { attendanceService } from '../../services/attendanceService'
import { formatDate } from '../../utils/format'

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'date', label: 'Tanggal' },
  { key: 'checkIn', label: 'Masuk' },
  { key: 'checkOut', label: 'Pulang' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi' },
]

const rows = ref([])
const loading = ref(true)
const saving = ref(false)

const search = ref('')
const statusFilter = ref('')

const showForm = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)

const emptyForm = () => ({ name: '', date: '', checkIn: '', checkOut: '', status: 'Hadir' })
const form = reactive(emptyForm())

const filtered = computed(() =>
  rows.value.filter((r) => {
    const matchName = r.name.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !statusFilter.value || r.status === statusFilter.value
    return matchName && matchStatus
  }),
)

async function load() {
  loading.value = true
  rows.value = await attendanceService.getAll()
  loading.value = false
}

function openForm() {
  Object.assign(form, emptyForm())
  showForm.value = true
}

async function save() {
  saving.value = true
  await attendanceService.create({ ...form })
  saving.value = false
  showForm.value = false
  await load()
}

function askDelete(row) {
  deleteTarget.value = row
  showDelete.value = true
}

async function confirmDelete() {
  await attendanceService.remove(deleteTarget.value.id)
  showDelete.value = false
  await load()
}

onMounted(load)
</script>

<template>
  <PageHeader title="Data Absensi" subtitle="Kelola data absensi peserta magang">
    <template #actions>
      <BaseButton class="w-full sm:w-auto" @click="openForm">
        <Plus class="h-4 w-4" /> Tambah Absensi
      </BaseButton>
    </template>
  </PageHeader>

  <BaseCard>
    <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_200px]">
      <div class="relative">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input v-model="search" class="input !pl-10" placeholder="Cari nama..." />
      </div>
      <BaseInput v-model="statusFilter" as="select">
        <option value="">Semua status</option>
        <option>Hadir</option>
        <option>Terlambat</option>
        <option>Izin</option>
        <option>Alpha</option>
      </BaseInput>
    </div>

    <DataTable :columns="columns" :rows="filtered" :loading="loading" empty-text="Data tidak ditemukan">
      <template #cell-date="{ value }">{{ formatDate(value) }}</template>
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-actions="{ row }">
        <BaseButton variant="ghost" size="sm" class="!text-rose-600" @click="askDelete(row)">
          <Trash2 class="h-4 w-4" /> Hapus
        </BaseButton>
      </template>
    </DataTable>
  </BaseCard>

  <!-- Modal tambah -->
  <BaseModal v-model="showForm" title="Tambah Absensi">
    <div class="space-y-4">
      <BaseInput v-model="form.name" label="Nama" placeholder="Nama peserta" />
      <BaseInput v-model="form.date" label="Tanggal" type="date" />
      <div class="grid grid-cols-2 gap-3">
        <BaseInput v-model="form.checkIn" label="Jam masuk" type="time" />
        <BaseInput v-model="form.checkOut" label="Jam pulang" type="time" />
      </div>
      <BaseInput v-model="form.status" label="Status" as="select">
        <option>Hadir</option>
        <option>Terlambat</option>
        <option>Izin</option>
        <option>Alpha</option>
      </BaseInput>
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="showForm = false">Batal</BaseButton>
      <BaseButton :loading="saving" @click="save">Simpan</BaseButton>
    </template>
  </BaseModal>

  <!-- Modal konfirmasi hapus -->
  <BaseModal v-model="showDelete" title="Hapus data?">
    <p class="text-sm text-slate-600">
      Data absensi <strong>{{ deleteTarget?.name }}</strong> akan dihapus.
    </p>
    <template #footer>
      <BaseButton variant="secondary" @click="showDelete = false">Batal</BaseButton>
      <BaseButton variant="danger" @click="confirmDelete">Hapus</BaseButton>
    </template>
  </BaseModal>
</template>
