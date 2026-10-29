# Hidraulika — Laboratorium Virtual

Aplikasi pembelajaran interaktif berbahasa Indonesia berdasarkan materi sifat fluida dan tekanan yang diberikan. Tanpa dependensi, akun, atau proses build.

## Menjalankan

Buka `index.html` di browser. Untuk server lokal, jalankan dari direktori proyek:

```sh
python3 -m http.server 8000
```

Buka http://localhost:8000. Aplikasi bekerja tanpa koneksi internet setelah file tersedia.

## Eksperimen

1. **Hukum Pascal** — gaya, luas piston, animasi langkah, tekanan, penguatan gaya, dan kekekalan kerja/volume.
2. **Bentuk & aliran** — dua bejana berpenampang berbeda, arah aliran akibat beda tekanan, dan kesetimbangan permukaan.
3. **Kompresibilitas** — perbandingan oli dan gas pada tekanan yang sama, volume akhir dan persentase penyusutan.
4. **Hidrostatis** — air, oli, air laut; kedalaman dan tekanan permukaan; tekanan gauge dan absolut.
5. **Gauge & absolut** — pengubahan acuan atmosfer dan vakum, termasuk tekanan gauge negatif.

Slider dapat digunakan dengan keyboard. Tombol reset mengembalikan eksperimen ke nilai awal. Animasi piston dan bejana dapat dijalankan, dijeda, dan diulang. Tata letak menyesuaikan ponsel.

## Asumsi fisika

- Gaya memakai N; luas input cm² dikonversi ke m². Materi yang menulis gaya dalam kg ditafsirkan sebagai kgf (1 kgf = 9,80665 N).
- Pascal memakai model ideal tanpa gesekan/kebocoran, massa fluida diabaikan. Diagram piston menggunakan lebar simbolis; langkah memenuhi A₁s₁ = A₂s₂. Animasi mengilustrasikan perpindahan yang diberikan, bukan dinamika beban.
- Bejana memakai luas penampang tetap 2:1. Tinggi akhir dihitung dengan kekekalan volume. Interpolasi waktu hanya ilustrasi, bukan prediksi debit.
- Oli memakai modulus bulk 1,725 GPa: pendekatan linear menghasilkan penyusutan 0,4% pada tambahan 6.900 kPa. Gas memakai hukum Boyle isotermal dengan tekanan awal absolut 101,325 kPa.
- Hidrostatis memakai g = 9,81 m/s², massa jenis konstan, fluida diam, dan atmosfer 101,325 kPa. Tekanan sama pada kedalaman yang sama; tambahan tekanan Pascal diteruskan merata.
- Nilai pada gambar yang tidak tepat diperjelas: cairan nyata sedikit kompresibel; tekanan absolut nol adalah vakum sempurna, bukan 100 kPa. Atmosfer standar sekitar 101,325 kPa.

## Pengujian

Node.js 20+:

```sh
node --test tests/physics.test.cjs
node --check app.js
node --check physics.js
node --check examples.js
```

Workflow GitHub Actions menjalankan pemeriksaan tersebut setiap push dan pull request.

## GitHub Pages (opsional)

Di Settings → Pages, pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu Save. Setelah GitHub menyelesaikan penerbitan, alamatnya: `https://creepz270x.github.io/hidraulika/`. URL tersebut baru aktif setelah Pages diaktifkan; commit kode saja tidak mengaktifkan hosting.

## Percobaan singkat sifat fluida

Empat kartu interaktif di bawah laboratorium utama:
- Ganti gelas tinggi, kotak, dan bak lebar untuk melihat bentuk air berubah tanpa menambah air.
- Geser tambahan tekanan untuk melihat panah tekanan membesar ke empat arah.
- Tekan dua suntikan tertutup dan bandingkan sisa volume oli dan udara.
- Pilih tangki yang lebih tinggi, lalu buka keran sampai permukaan sama tinggi.

Label utama memakai posisi tetap, terpisah dari komponen bergerak. Penjelasan menggunakan langkah mencoba dan pengamatan sederhana; rumus teknis dapat dibuka bila diperlukan. Contoh siap pilih tersedia untuk setiap eksperimen (termasuk wadah terbuka, ban sepeda, dan penyedot). Animasi menghormati preferensi reduced motion.
