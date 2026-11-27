import { attendanceService } from './attendanceService'

export const dashboardService = {
  async getSummary() {
    const rows = await attendanceService.getAll()
    const count = (status) => rows.filter((r) => r.status === status).length

    return {
      total: rows.length,
      hadir: count('Hadir'),
      terlambat: count('Terlambat'),
      izin: count('Izin'),
      recent: rows.slice(0, 5),
    }
  },
}
