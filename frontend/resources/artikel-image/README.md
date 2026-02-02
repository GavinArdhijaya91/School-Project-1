# Cara Menambahkan Gambar Artikel

## Lokasi Gambar
Semua gambar artikel harus ditempatkan di folder:
```
frontend/resources/artikel-image/
```

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

seperti:
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
