<script setup>
defineProps({
  columns: { type: Array, required: true }, // [{ key, label }]
  rows: { type: Array, default: () => [] },
  loading: Boolean,
  emptyText: { type: String, default: 'Belum ada data' },
})
</script>

<template>
  <div>
    <p v-if="loading" class="py-12 text-center text-sm text-slate-500">Memuat data...</p>
    <p v-else-if="!rows.length" class="py-12 text-center text-sm text-slate-500">{{ emptyText }}</p>

    <template v-else>
      <!-- Tablet & desktop -->
      <div class="hidden overflow-x-auto md:block">
        <table class="table">
          <thead>
            <tr><th v-for="col in columns" :key="col.key">{{ col.label }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in columns" :key="col.key">
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- HP -->
      <ul class="space-y-3 md:hidden">
        <li v-for="row in rows" :key="row.id" class="rounded-xl border border-slate-200 p-4">
          <div
            v-for="col in columns"
            :key="col.key"
            class="flex items-start justify-between gap-4 py-1.5 text-sm"
          >
            <span class="shrink-0 text-slate-500">{{ col.label }}</span>
            <span class="text-right font-medium text-slate-800">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
            </span>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
