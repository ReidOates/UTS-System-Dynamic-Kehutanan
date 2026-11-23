# Simulasi Sistem Dinamik Kehilangan Tutupan Pohon di Indonesia

## Deskripsi Proyek

Proyek ini merupakan tugas Ujian Tengah Semester (UTS) mata kuliah **Pemodelan dan Simulasi**. Proyek bertujuan menerapkan pendekatan *System Dynamics* untuk memodelkan akumulasi kehilangan tutupan pohon di Indonesia selama periode 2001–2024.

Model menggunakan pendekatan **Stock and Flow**, dengan membandingkan kondisi baseline terhadap beberapa skenario pengurangan kehilangan tutupan pohon tahunan.

## Tujuan

1. Menganalisis data historis kehilangan tutupan pohon di Indonesia.
2. Menerapkan konsep Stock and Flow dalam pemodelan sistem dinamik.
3. Menghitung akumulasi kehilangan tutupan pohon selama periode pengamatan.
4. Membandingkan hasil simulasi berdasarkan skenario pengurangan 10% dan 20%.
5. Menyajikan hasil simulasi melalui aplikasi web interaktif.

## Periode dan Data

- Wilayah: Indonesia
- Periode: 2001–2024
- Jumlah observasi: 24 tahun
- Variabel utama: kehilangan tutupan pohon tahunan
- Satuan: hektare

Data historis yang telah diproses disimpan dalam folder `data/processed/`.

## Metodologi Model

Model menggunakan satu variabel Stock dan satu variabel Inflow.

| Komponen | Nama Variabel | Satuan |
|---|---|---|
| Stock | Akumulasi Kehilangan Tutupan Pohon | Hektare |
| Inflow | Kehilangan Tutupan Pohon Tahunan | Hektare/tahun |

### Persamaan Model

Persamaan akumulasi:

`Stock(t) = Stock(t-1) + Flow(t)`

Nilai awal Stock ditetapkan sebesar 0 hektare pada awal periode simulasi.

### Skenario Simulasi

1. **Baseline:** menggunakan nilai kehilangan tutupan pohon historis tanpa pengurangan.
2. **Pengurangan 10%:** nilai kehilangan tahunan diasumsikan berkurang sebesar 10%.
3. **Pengurangan 20%:** nilai kehilangan tahunan diasumsikan berkurang sebesar 20%.

Skenario tersebut merupakan asumsi simulasi untuk membandingkan perubahan akumulasi, bukan hasil kebijakan aktual atau prediksi kondisi masa depan.

## Hasil Simulasi

Hasil akumulasi pada akhir periode 2024:

| Skenario | Akumulasi (Hektare) |
|---|---:|
| Baseline | 31.906.205,88 |
| Pengurangan 10% | 28.715.585,29 |
| Pengurangan 20% | 25.524.964,70 |

Hasil menunjukkan bahwa peningkatan asumsi pengurangan kehilangan tutupan pohon tahunan menghasilkan akumulasi yang lebih rendah selama periode simulasi.

## Aplikasi Web

Aplikasi web dibuat menggunakan HTML, CSS, dan JavaScript dengan Chart.js untuk visualisasi grafik.

Fitur aplikasi:

- Dashboard ringkasan data.
- Grafik dan tabel data historis.
- Unduhan data historis dalam format CSV.
- Simulasi persentase pengurangan kehilangan tutupan pohon.
- Perbandingan hasil antar-skenario.
- Dokumentasi struktur dan persamaan model.

### Cara Menjalankan

1. Buka folder `web/` menggunakan Visual Studio Code.
2. Buka file `index.html`.
3. Jalankan menggunakan ekstensi Live Server.
4. Aplikasi akan terbuka melalui browser.

Aplikasi menggunakan Chart.js melalui CDN sehingga koneksi internet diperlukan untuk memuat pustaka grafik.

## Struktur Repository

```text
UTS-System-Dynamic-Kehutanan/
├── README.md
├── .gitignore
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
│   └── UTS_System_dynamic_kehutanan.ipynb
└── web/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── app.js
        └── data.js
```

## Batasan Model

Model ini merupakan model sistem dinamik sederhana yang berfokus pada akumulasi kehilangan tutupan pohon.

Beberapa batasannya:

- Model hanya menggunakan satu Stock dan satu Inflow.
- Model belum memasukkan faktor reforestasi, kebakaran hutan, perubahan penggunaan lahan, maupun faktor lainnya.
- Skenario pengurangan merupakan asumsi untuk eksperimen simulasi.
- Akumulasi kehilangan tutupan pohon tidak dapat diartikan sebagai luas hutan Indonesia yang tersisa.
- Kehilangan tutupan pohon tidak selalu identik dengan deforestasi permanen.

## Teknologi

- Python
- Jupyter Notebook
- Pandas
- Matplotlib
- HTML
- CSS
- JavaScript
- Chart.js
- Git dan GitHub

## Penutup

Proyek ini memperlihatkan penerapan konsep sistem dinamik melalui hubungan antara Stock dan Flow serta penggunaan simulasi skenario untuk menganalisis perubahan akumulasi kehilangan tutupan pohon di Indonesia selama periode 2001–2024.
