import { attendanceData } from '../data/attendanceData'
import { simulate } from './api'

let db = [...attendanceData]

export const attendanceService = {
  getAll: () => simulate(db),

  create: (payload) => {
    const item = { id: Date.now(), ...payload }
    db = [item, ...db]
    return simulate(item)
  },

  remove: (id) => {
    db = db.filter((item) => item.id !== id)
    return simulate({ id })
  },
}
