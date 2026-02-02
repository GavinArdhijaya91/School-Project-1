# Cara Menambahkan Gambar Artikel

## Lokasi Gambar
Semua gambar artikel harus ditempatkan di folder:
```
frontend/resources/artikel-image/
```

## Nama File yang Dibutuhkan

Saat ini, sistem membutuhkan 6 gambar artikel dengan nama file sebagai berikut:

1. **olimpiade-sains.jpg** - Untuk artikel "Prestasi Siswa di Olimpiade Sains"
2. **ppdb.jpg** - Untuk artikel "Penerimaan Peserta Didik Baru"
3. **bakti-sosial.jpg** - Untuk artikel "Kegiatan Bakti Sosial OSIS"
4. **workshop-robotik.jpg** - Untuk artikel "Workshop Robotik"
5. **lomba-kebersihan.jpg** - Untuk artikel "Lomba Kebersihan Kelas"
6. **seminar-pt.jpg** - Untuk artikel "Seminar Perguruan Tinggi"

## Format Gambar yang Disarankan

- **Format**: JPG, PNG, atau WebP
- **Ukuran**: Minimal 800x600 pixels (rasio 4:3 atau 16:9)
- **Ukuran File**: Maksimal 500KB per gambar untuk performa optimal
- **Orientasi**: Landscape (horizontal) lebih baik

## Cara Menambahkan Gambar

1. Siapkan gambar Anda dengan nama file yang sesuai
2. Copy gambar ke folder `frontend/resources/artikel-image/`
3. Refresh browser - gambar akan otomatis muncul!

## Placeholder

Jika gambar tidak ditemukan, sistem akan menampilkan:
- Background gradient biru-abu (warna tema sekolah)
- Icon gambar putih di tengah
- Tetap terlihat profesional dan rapi

## Menambah Artikel Baru

Untuk menambahkan artikel baru dengan gambar, edit file `Home.jsx`:

```javascript
const articles = [
    // ... artikel lain
    { 
        id: 7, 
        title: 'Judul Artikel Baru', 
        date: 'DD MMM YYYY', 
        excerpt: 'Deskripsi singkat artikel...',
        image: '../resources/artikel-image/nama-file-gambar.jpg'
    },
];
```

## Tips

- Gunakan gambar yang relevan dengan konten artikel
- Pastikan gambar memiliki kualitas yang baik
- Compress gambar sebelum upload untuk performa lebih cepat
- Gunakan nama file yang deskriptif dan mudah diingat
