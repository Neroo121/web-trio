const beritaData = [
    {
        id: 1,
        judul: "Perkembangan Kecerdasan Buatan Mulai Membantu Pelajar Belajar Coding",
        kategori: "teknologi",
        tanggal: "27 November 2026",
        penulis: "Raka Pratama",
        gambar: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        ringkasan: "Pemanfaatan asisten AI dalam pendidikan pemrograman terbukti mempercepat pemahaman logika dasar bagi pemula.",
        isi: "Pemanfaatan teknologi kecerdasan buatan (AI) kini semakin meluas di kalangan pelajar dan mahasiswa. Banyak pengajar mulai mengintegrasikan alat bantu berbasis AI untuk menjelaskan konsep pemrograman yang rumit menjadi lebih mudah dipahami.\n\nMeski demikian, para ahli tetap menyarankan agar pelajar tidak hanya menyalin kode secara instan, melainkan memahami alur logika di balik setiap baris kode yang dibuat."
    },
    {
        id: 2,
        judul: "Tim Nasional Futsal Gelar Pemusatan Latihan Jelang Turnamen Asia",
        kategori: "olahraga",
        tanggal: "26 November 2026",
        penulis: "Dina Lestari",
        gambar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        ringkasan: "Sebanyak 18 pemain dipanggil untuk mengikuti pemusatan latihan intensif selama tiga pekan ke depan.",
        isi: "Federasi futsal resmi mengumumkan daftar 18 pemain yang akan mengikuti pemusatan latihan nasional. Latihan difokuskan pada peningkatan fisik, transisi bertahan ke menyerang, serta penyelesaian akhir.\n\nPelatih kepala optimistis skuad tahun ini mampu memberikan kejutan dan lolos dari fase grup dengan hasil maksimal."
    },
    {
        id: 3,
        judul: "Tips Mengatur Waktu Layar (Screen Time) Agar Tidur Lebih Berkualitas",
        kategori: "gaya-hidup",
        tanggal: "25 November 2026",
        penulis: "Sari Wijaya",
        gambar: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
        ringkasan: "Mengurangi paparan cahaya biru satu jam sebelum tidur dapat membantu tubuh beristirahat lebih nyenyak.",
        isi: "Kebiasaan menatap layar ponsel hingga larut malam sering kali menjadi penyebab utama gangguan tidur pada remaja dan pekerja muda.\n\nPara praktisi kesehatan menyarankan untuk mengaktifkan fitur mode malam dan menjauhkan gawai setidaknya 45 hingga 60 menit sebelum waktu tidur agar kualitas istirahat tetap terjaga."
    },
    {
        id: 4,
        judul: "Inovasi Baterai Ramah Lingkungan Mulai Diuji Coba pada Kendaraan Listrik",
        kategori: "teknologi",
        tanggal: "24 November 2026",
        penulis: "Budi Santoso",
        gambar: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
        ringkasan: "Baterai generasi baru ini diklaim mampu mengisi daya hingga 80 persen hanya dalam waktu 12 menit.",
        isi: "Industri kendaraan listrik kembali mencatatkan kemajuan penting melalui uji coba baterai berbasis material yang lebih mudah didaur ulang.\n\nSelain waktu pengisian daya yang jauh lebih singkat, baterai ini juga dirancang agar lebih tahan terhadap suhu panas sehingga meningkatkan keamanan berkendara."
    }
];

const headlineContainer = document.getElementById('headline-container');
const newsGrid = document.getElementById('news-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('article-modal');
const closeModalBtn = document.getElementById('close-modal');
const themeToggle = document.getElementById('theme-toggle');

document.getElementById('year').textContent = new Date().getFullYear();

function renderHeadline() {
    const utama = beritaData[0];
    headlineContainer.innerHTML = `
        <img src="${utama.gambar}" alt="${utama.judul}">
        <div class="headline-content">
            <span class="badge">${utama.kategori}</span>
            <h2>${utama.judul}</h2>
            <p class="meta">Oleh ${utama.penulis} • ${utama.tanggal}</p>
            <p>${utama.ringkasan}</p>
        </div>
    `;
    headlineContainer.onclick = () => bukaModal(utama);
}

function renderBerita(daftarBerita) {
    newsGrid.innerHTML = '';
    if (daftarBerita.length === 0) {
        newsGrid.innerHTML = '<p style="color: var(--muted);">Berita tidak ditemukan.</p>';
        return;
    }

    daftarBerita.forEach(item => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.judul}">
            <div class="card-body">
                <span class="badge">${item.kategori}</span>
                <h3>${item.judul}</h3>
                <p class="meta">${item.tanggal}</p>
            </div>
        `;
        card.onclick = () => bukaModal(item);
        newsGrid.appendChild(card);
    });
}

function bukaModal(berita) {
    document.getElementById('modal-category').textContent = berita.kategori;
    document.getElementById('modal-title').textContent = berita.judul;
    document.getElementById('modal-meta').textContent = `Oleh ${berita.penulis} • ${berita.tanggal}`;
    document.getElementById('modal-image').src = berita.gambar;
    document.getElementById('modal-body').textContent = berita.isi;
    modal.classList.remove('hidden');
}

closeModalBtn.onclick = () => modal.classList.add('hidden');
window.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const kat = btn.dataset.category;
        const hasil = kat === 'semua' ? beritaData : beritaData.filter(item => item.kategori === kat);
        renderBerita(hasil);
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

renderHeadline();
renderBerita(beritaData);