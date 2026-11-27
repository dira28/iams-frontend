import { simulate } from './api'

// Dummy: email diawali "admin" -> admin, selain itu -> peserta magang
export const authService = {
  login: ({ email }) => {
    const isAdmin = email.trim().toLowerCase().startsWith('admin')
    return simulate(
      isAdmin
        ? { name: 'Admin IAMS', email, role: 'admin' }
        : { name: 'Andi Pratama', email, role: 'intern' },
      600,
    )
  },
}
