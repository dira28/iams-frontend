<script setup>
import { computed } from 'vue'

const props = defineProps({ status: String })

const map = {
  Hadir: 'badge-success',
  Terlambat: 'badge-warning',
  Izin: 'badge-info',
  Alpha: 'badge-danger',
}
const cls = computed(() => map[props.status] ?? 'badge-neutral')
</script>

<template>
  <span class="badge" :class="cls">{{ status }}</span>
</template>
