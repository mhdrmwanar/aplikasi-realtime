# 📊 Aplikasi Survey Feedback Live

Aplikasi survey feedback realtime yang memungkinkan peserta mengirim feedback dan melihat hasil divisualisasikan secara langsung dengan fitur anonymous.

## ✨ Fitur Utama

### 🎯 Untuk Peserta Survey
- **Submit Feedback Realtime**: Rating 1-5 bintang dengan komentar opsional
- **Mode Anonymous**: Opsi untuk mengirim feedback secara anonim
- **Statistik Live**: Melihat statistik agregat secara realtime
- **UI Responsif**: Desain modern dan mobile-friendly

### 📈 Untuk Admin
- **Dashboard Realtime**: Monitoring semua feedback masuk secara live
- **Visualisasi Data**: 
  - Chart distribusi rating
  - Analisis sentimen (positif, netral, negatif)
  - Word cloud dari kata kunci populer
- **Manajemen Data**: Reset semua data feedback
- **Feedback Terbaru**: List feedback dengan timestamp dan sentiment

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- NPM

### Instalasi dan Menjalankan
```bash
# Clone atau download project ini
# Masuk ke direktori project
cd aplikasi-realtime

# Install dependencies (sudah ter-install)
npm install

# Jalankan server
npm start
# atau
npm run dev
```

Server akan berjalan di:
- **Form Feedback**: http://localhost:3001
- **Dashboard Admin**: http://localhost:3001/admin

## 🏗️ Struktur Proyek

```
aplikasi-realtime/
├── server/
│   └── server.js           # Backend server dengan Socket.IO
├── client/
│   ├── index.html          # Halaman form feedback
│   └── admin.html          # Dashboard admin
├── .github/
│   └── copilot-instructions.md
├── package.json
└── README.md
```

## 🔧 Teknologi yang Digunakan

### Backend
- **Node.js & Express.js**: Server dan API
- **Socket.IO**: Komunikasi realtime bidirectional
- **CORS**: Cross-Origin Resource Sharing

### Frontend  
- **HTML/CSS/JavaScript**: UI vanilla modern
- **Chart.js**: Visualisasi chart dan grafik
- **WordCloud2.js**: Generasi word cloud
- **Socket.IO Client**: Koneksi realtime ke server

## 📱 Fitur Detail

### Form Feedback (index.html)
- Rating system dengan bintang interaktif
- Textarea untuk komentar dengan counter karakter
- Checkbox untuk mode anonymous
- Notifikasi sukses/error realtime
- Statistik live di bagian bawah

### Dashboard Admin (admin.html)
- **Statistik Overview**: Total feedback, rating rata-rata, persentase positif
- **Chart Distribusi Rating**: Bar chart untuk setiap rating 1-5
- **Chart Sentimen**: Doughnut chart analisis sentimen
- **Word Cloud**: Visualisasi kata-kata populer dari komentar
- **List Feedback**: Semua feedback dengan timestamp dan sentiment
- **Reset Data**: Tombol untuk menghapus semua data

### Analisis Sentiment
Sistem melakukan analisis sentiment sederhana berdasarkan:
- **Kata Positif**: bagus, baik, hebat, excellent, good, great, dll
- **Kata Negatif**: buruk, jelek, bad, terrible, awful, dll
- **Default**: neutral jika tidak ada kata kunci yang terdeteksi

## 🔄 Real-time Events

### Socket.IO Events
- `submitFeedback`: Kirim feedback baru
- `feedbackUpdate`: Broadcast data terbaru ke semua client
- `feedbackSubmitted`: Konfirmasi feedback berhasil dikirim
- `resetData`: Reset semua data (admin only)
- `error`: Notifikasi error

## 🎨 Design Features

- **Modern Gradient Design**: Gradien warna yang menarik
- **Smooth Animations**: Transisi dan animasi halus
- **Responsive Layout**: Adaptif untuk desktop dan mobile
- **Interactive Elements**: Hover effects dan feedback visual
- **Color-coded Sentiment**: Indikator warna untuk sentiment

## 📊 Data Storage

Saat ini menggunakan **in-memory storage** untuk demo. Data akan hilang ketika server di-restart. 

Untuk production, dapat diintegrasikan dengan database seperti:
- MongoDB
- PostgreSQL
- MySQL
- Redis (untuk caching)

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Ready
1. Set environment variables untuk PORT
2. Implementasi database persistent
3. Add authentication untuk admin dashboard
4. Setup reverse proxy (nginx)
5. Enable HTTPS

## 🔐 Security Notes

- Saat ini tidak ada authentication untuk admin dashboard
- Input validation pada client dan server side
- CORS configuration untuk development
- Rate limiting dapat ditambahkan untuk production

## 🤝 Contributing

1. Fork project ini
2. Buat branch fitur baru
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📄 License

ISC License

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat GitHub issue atau hubungi developer.

---

**Happy Surveying! 🎉**
