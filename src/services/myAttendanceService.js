import { simulate } from './api'
import { toISODate, formatTime } from '../utils/format'

const pattern = ['Hadir', 'Hadir', 'Terlambat', 'Hadir', 'Izin', 'Hadir', 'Hadir', 'Alpha', 'Hadir']

// Riwayat dummy: 9 hari kerja sebelum hari ini
function seed() {
  const rows = []
  const d = new Date()
  let id = 1
  let i = 0
  while (rows.length < 9) {
    d.setDate(d.getDate() - 1)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const status = pattern[i++ % pattern.length]
    const off = status === 'Izin' || status === 'Alpha'
    rows.push({
      id: id++,
      date: toISODate(d),
      checkIn: off ? '-' : status === 'Terlambat' ? '08:20' : '07:58',
      checkOut: off ? '-' : '17:02',
      status,
    })
  }
  return rows
}

let db = seed()
const todayRow = () => db.find((r) => r.date === toISODate()) ?? null

export const myAttendanceService = {
  getHistory: () => simulate(db),

  getToday: () => simulate(todayRow()),

  checkIn: () => {
    const now = formatTime()
    const item = {
      id: Date.now(),
      date: toISODate(),
      checkIn: now,
      checkOut: '-',
      status: now > '08:00' ? 'Terlambat' : 'Hadir', // aturan dummy: lewat 08:00 = terlambat
    }
    db = [item, ...db]
    return simulate(item)
  },

  checkOut: () => {
    db = db.map((r) => (r.date === toISODate() ? { ...r, checkOut: formatTime() } : r))
    return simulate(todayRow())
  },
}
