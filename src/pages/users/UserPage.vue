<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Plus, Search, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseModal from '../../components/ui/BaseModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { userService } from '../../services/userService'

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi' },
]
const roleLabel = { admin: 'Admin', intern: 'Peserta Magang' }

const rows = ref([])
const loading = ref(true)
const saving = ref(false)

const search = ref('')
const roleFilter = ref('')

const showForm = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)
const editingId = ref(null)

const emptyForm = () => ({ name: '', email: '', role: 'intern', status: 'Aktif' })
const form = reactive(emptyForm())
const errors = reactive({ name: '', email: '' })

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return rows.value.filter((u) => {
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchRole = !roleFilter.value || u.role === roleFilter.value
    return matchQ && matchRole
  })
})

async function load() {
  loading.value = true
  rows.value = await userService.getAll()
  loading.value = false
}

function resetErrors() {
  errors.name = ''
  errors.email = ''
}

function openCreate() {
  editingId.value = null
  Object.assign(form, emptyForm())
  resetErrors()
  showForm.value = true
}

function openEdit(row) {
  editingId.value = row.id
  Object.assign(form, { name: row.name, email: row.email, role: row.role, status: row.status })
  resetErrors()
  showForm.value = true
}

function validate() {
  errors.name = form.name.trim() ? '' : 'Nama wajib diisi'
  errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Format email tidak valid'
  return !errors.name && !errors.email
}

async function save() {
  if (!validate()) return
  saving.value = true
  if (editingId.value) await userService.update(editingId.value, { ...form })
  else await userService.create({ ...form })
  saving.value = false
  showForm.value = false
  await load()
}

function askDelete(row) {
  deleteTarget.value = row
  showDelete.value = true
}

async function confirmDelete() {
  await userService.remove(deleteTarget.value.id)
  showDelete.value = false
  await load()
}

onMounted(load)
</script>

<template>
  <PageHeader title="Kelola User" subtitle="Atur akun admin dan peserta magang">
    <template #actions>
      <BaseButton class="w-full sm:w-auto" @click="openCreate">
        <Plus class="h-4 w-4" /> Tambah User
      </BaseButton>
    </template>
  </PageHeader>

  <BaseCard>
    <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_200px]">
      <div class="relative">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input v-model="search" class="input !pl-10" placeholder="Cari nama atau email..." />
      </div>
      <BaseInput v-model="roleFilter" as="select">
        <option value="">Semua role</option>
        <option value="admin">Admin</option>
        <option value="intern">Peserta Magang</option>
      </BaseInput>
    </div>

    <DataTable :columns="columns" :rows="filtered" :loading="loading" empty-text="User tidak ditemukan">
      <template #cell-name="{ row }">
        <span class="inline-flex items-center gap-2.5">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {{ row.name.charAt(0).toUpperCase() }}
          </span>
          {{ row.name }}
        </span>
      </template>
      <template #cell-role="{ value }">
        <span class="badge" :class="value === 'admin' ? 'badge-info' : 'badge-neutral'">{{ roleLabel[value] }}</span>
      </template>
      <template #cell-status="{ value }">
        <span class="badge" :class="value === 'Aktif' ? 'badge-success' : 'badge-neutral'">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <span class="inline-flex gap-1">
          <BaseButton variant="ghost" size="sm" @click="openEdit(row)">
            <Pencil class="h-4 w-4" /> Edit
          </BaseButton>
          <BaseButton variant="ghost" size="sm" class="!text-rose-600" @click="askDelete(row)">
            <Trash2 class="h-4 w-4" /> Hapus
          </BaseButton>
        </span>
      </template>
    </DataTable>
  </BaseCard>

  <!-- Modal tambah / edit -->
  <BaseModal v-model="showForm" :title="editingId ? 'Edit User' : 'Tambah User'">
    <div class="space-y-4">
      <BaseInput v-model="form.name" label="Nama" placeholder="Nama lengkap" :error="errors.name" />
      <BaseInput v-model="form.email" label="Email" type="email" placeholder="nama@email.com" :error="errors.email" />
      <div class="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        <BaseInput v-model="form.role" label="Role" as="select">
          <option value="intern">Peserta Magang</option>
          <option value="admin">Admin</option>
        </BaseInput>
        <BaseInput v-model="form.status" label="Status" as="select">
          <option>Aktif</option>
          <option>Nonaktif</option>
        </BaseInput>
      </div>
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="showForm = false">Batal</BaseButton>
      <BaseButton :loading="saving" @click="save">Simpan</BaseButton>
    </template>
  </BaseModal>

  <!-- Modal konfirmasi hapus -->
  <BaseModal v-model="showDelete" title="Hapus user?">
    <p class="text-sm text-slate-600">
      Akun <strong>{{ deleteTarget?.name }}</strong> akan dihapus.
    </p>
    <template #footer>
      <BaseButton variant="secondary" @click="showDelete = false">Batal</BaseButton>
      <BaseButton variant="danger" @click="confirmDelete">Hapus</BaseButton>
    </template>
  </BaseModal>
</template>
