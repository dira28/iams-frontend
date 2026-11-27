const pad = (n) => String(n).padStart(2, '0')

export function formatDate(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// 'YYYY-MM-DD' sesuai zona waktu perangkat
export function toISODate(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// 'HH:mm'
export function formatTime(d = new Date()) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// 'HH:mm:ss' untuk jam digital
export function formatClock(d = new Date()) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
