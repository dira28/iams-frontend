import { userData } from '../data/userData'
import { simulate } from './api'

let db = [...userData]

export const userService = {
  getAll: () => simulate(db),

  create: (payload) => {
    const item = { id: Date.now(), ...payload }
    db = [item, ...db]
    return simulate(item)
  },

  update: (id, payload) => {
    db = db.map((u) => (u.id === id ? { ...u, ...payload } : u))
    return simulate(db.find((u) => u.id === id))
  },

  remove: (id) => {
    db = db.filter((u) => u.id !== id)
    return simulate({ id })
  },
}
