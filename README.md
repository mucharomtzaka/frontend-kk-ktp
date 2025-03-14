# Aplikasi Pendataan KTP Penduduk dan Kartu Keluarga (Frontend)

Aplikasi ini adalah sistem pendataan KTP Penduduk dan Kartu Keluarga berbasis web yang dibuat menggunakan **React.js** dan **Vite** sebagai frontend. Aplikasi ini terhubung dengan backend berbasis **Laravel 11**.

## 🚀 Fitur Utama
- ** CRUD KTP Penduduk dan Kartu Keluarga ** (Tambah, Lihat, Edit, Hapus)
- **Integrasi dengan Kartu Keluarga**
- **Notifikasi dengan React Toastify**
- **Navigasi menggunakan React Router**
- **Fetch Data dari API menggunakan Axios**
- **Form Validation**

## 🛠️ Teknologi yang Digunakan
- **React.js** (Vite)
- **React Router DOM** (Navigasi)
- **Axios** (HTTP Requests)
- **Tailwind CSS** (Styling UI)
- **React Toastify** (Notifikasi)
- **Dotenv** (Konfigurasi Variabel Lingkungan)

## 📂 Struktur Folder
```
📂 src
 ┣ 📂 pages             # Halaman utama
 ┣ 📂 routes            # Konfigurasi routing
 ┣ 📜 App.jsx           # Entry point aplikasi
 ┣ 📜 main.jsx          # Bootstrap React
 ┣ 📜 index.css         # Styling utama
 ┗ 📜 .env              # Konfigurasi API
```

## 📌 Instalasi dan Menjalankan Aplikasi
### 1️⃣ Clone Repository
```sh
git clone https://github.com/username/repo-frontend.git
cd repo-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Konfigurasi API Backend
Buat file `.env` di root proyek dan tambahkan:
```sh
VITE_API_URL=http://localhost:8000/api
```

### 4️⃣ Menjalankan Aplikasi
```sh
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

## 📜 API Endpoint Repository
``` https://github.com/mucharomtzaka/laravel-kk-ktp.git  ```

## ✨ Kontributor
- **Mucharom** - [GitHub](https://github.com/mucharomtzaka)

---
💡 **Catatan:** Pastikan backend Laravel sudah berjalan sebelum menjalankan frontend.

