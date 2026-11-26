# IAMS Frontend

Frontend untuk **Internship Attendance Management System (IAMS)**, sistem pengelolaan absensi peserta magang.

> Status: tahap awal, UI dummy (belum terhubung backend/API).

## Tech Stack

- Vue 3
- Vite
- Tailwind CSS
- Vue Router

## Prasyarat

- Node.js (disarankan versi LTS)
- npm

## Menjalankan Project

```bash
# install dependencies
npm install

# jalankan development server
npm run dev

# build untuk production
npm run build
```

## Struktur Folder

```
src/
├── assets/        # CSS dan aset statis
├── components/
│   ├── common/    # Komponen umum (tombol, input, badge)
│   ├── layout/    # Sidebar, navbar
│   └── ui/        # Card, tabel, modal
├── layouts/       # Kerangka halaman utama
├── pages/         # Halaman aplikasi
├── router/        # Konfigurasi routing
├── data/          # Data dummy
├── App.vue
└── main.js
```

## Rencana Pengerjaan

1. Setup project dan struktur folder
2. Layout utama (Sidebar, Navbar)
3. Halaman sesuai desain Canva dengan data dummy
4. Interaksi dummy, routing, dan responsive
5. Integrasi API setelah UI disetujui

## Konvensi Commit

- `feat:` fitur baru
- `fix:` perbaikan bug
- `style:` perubahan tampilan
- `docs:` perubahan dokumentasi
- `chore:` setup dan konfigurasi