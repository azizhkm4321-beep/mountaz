/* ==========================================================================
   MOUNTAZ — ALPINE EXPEDITION GLASS ENGINE (STANDALONE MODULE)
   High-Altitude Mountain Expedition & Data Structure Simulation
   ========================================================================== */

const DESTINATIONS = [
  { 
    id: "bromo", 
    name: "Gunung Bromo", 
    location: "Jawa Timur", 
    price: 35000, 
    difficulty: "Mudah", 
    duration: 3, 
    availability: "Tersedia", 
    height: 2329, 
    quota: 85,
    quotaTotal: 100,
    coords: "7.9425° S, 112.9530° E",
    image: "asset/bromo.jpg", 
    description: "Lautan pasir kaldera Tengger dan panorama matahari terbit spektakuler di batas cakrawala vulkanik aktif.", 
    route: "Cemoro Lawang – Lautan Pasir – Kawah Bromo – Penanjakan 1", 
    equipment: ["Jaket windbreaker", "Masker debu vulkanik", "Kacamata pelindung", "Air minum 1.5L"] 
  },
  { 
    id: "semeru", 
    name: "Gunung Semeru", 
    location: "Jawa Timur", 
    price: 55000, 
    difficulty: "Sulit", 
    duration: 3, 
    availability: "Perlu cek kuota", 
    height: 3676, 
    quota: 18,
    quotaTotal: 150,
    coords: "8.1077° S, 112.9224° E",
    image: "asset/semeru.jpg", 
    description: "Puncak tertinggi di Pulau Jawa (Mahameru) dengan vegetasi cemara gunung, savana Oro-oro Ombo, dan keindahan Danau Ranu Kumbolo.", 
    route: "Ranu Pani – Ranu Kumbolo – Cemoro Kandang – Kalimati – Mahameru", 
    equipment: ["Tenda dome alpine 3-musim", "Sleeping bag sub-zero", "Jaket insulasi bulu angsa", "Kompor lapangan", "P3K lengkap"] 
  },
  { 
    id: "prau", 
    name: "Gunung Prau", 
    location: "Jawa Tengah", 
    price: 25000, 
    difficulty: "Menengah", 
    duration: 2, 
    availability: "Tersedia", 
    height: 2565, 
    quota: 64,
    quotaTotal: 120,
    coords: "7.1878° S, 109.9219° E",
    image: "asset/prau.jpg", 
    description: "Jalur pendakian ramah pemula dengan bentang perbukitan teletubbies dan panorama golden sunrise ke arah Gunung Sindoro dan Sumbing.", 
    route: "Basecamp Patak Banteng – Pos 1 Sikecil – Pos 2 Semar – Puncak Sunrise Camp", 
    equipment: ["Jaket polar fleece", "Headlamp & baterai cadangan", "Jas hujan ponco", "Sepatu trekking bergrip"] 
  },
  { 
    id: "lawu", 
    name: "Gunung Lawu", 
    location: "Jawa Tengah", 
    price: 30000, 
    difficulty: "Menengah", 
    duration: 2, 
    availability: "Tersedia", 
    height: 3265, 
    quota: 42,
    quotaTotal: 100,
    coords: "7.6258° S, 111.1928° E",
    image: "asset/lawu.jpg", 
    description: "Gunung bersejarah dengan hutan lumut eksotis, jalur berbatu tertata rapi, dan warung legendaris Mbok Yem di ketinggian 3.150 MASL.", 
    route: "Cemoro Sewu – Pos 1 Wes-wesan – Pos 2 Watu Gedeg – Pos 3 – Pos 4 – Pos 5 – Hargo Dumilah", 
    equipment: ["Jaket tebal windproof", "Sarung tangan polar", "Kupluk rajut hangat", "Obat pribadi"] 
  },
  { 
    id: "rinjani", 
    name: "Gunung Rinjani", 
    location: "Nusa Tenggara Barat", 
    price: 75000, 
    difficulty: "Sulit", 
    duration: 3, 
    availability: "Perlu cek kuota", 
    height: 3726, 
    quota: 14,
    quotaTotal: 150,
    coords: "8.4117° S, 116.4567° E",
    image: "asset/rinjani.jpg", 
    description: "Kaldera raksasa menawan dengan Danau Segara Anak berair biru toska, kerucut vulkanik Gunung Barujari, dan punggungan pasir Sembalun yang menantang.", 
    route: "Pintu Sembalun – Pos 2 Tengengean – Plawangan Sembalun – Puncak Rinjani – Segara Anak – Torean", 
    equipment: ["Tenda gunung waterproof", "Trekking pole ganda", "Gaiters pasir", "Pakaian teknis quick-dry"] 
  },
  { 
    id: "merbabu", 
    name: "Gunung Merbabu", 
    location: "Jawa Tengah", 
    price: 40000, 
    difficulty: "Sulit", 
    duration: 2, 
    availability: "Tersedia", 
    height: 3145, 
    quota: 50,
    quotaTotal: 120,
    coords: "7.4542° S, 110.4403° E",
    image: "asset/merbabu.jpg", 
    description: "Punggungan padang savana ilalang hijau membentang luas berhiaskan edelweiss serta lanskap megah Gunung Merapi di hadapan mata.", 
    route: "Basecamp Selo – Pos 1 Dok-dok – Pos 2 Pandean – Pos 3 Watu Tulis – Sabana 1 – Sabana 2 – Kenteng Songo", 
    equipment: ["Jaket tahan angin", "Sunblock & topi rimba", "Headlamp", "Air minum minimal 3 Liter"] 
  },
  {
    id: "kerinci",
    name: "Gunung Kerinci",
    location: "Jambi",
    price: 65000,
    difficulty: "Sulit",
    duration: 4,
    availability: "Perlu cek kuota",
    height: 3805,
    quota: 16,
    quotaTotal: 100,
    coords: "1.6970° S, 101.2640° E",
    image: "asset/kerinci.jpg",
    description: "Puncak tertinggi di Sumatra dengan jalur hutan tropis lebat dan panorama luas dari kawasan Taman Nasional Kerinci Seblat.",
    route: "Kersik Tuo – Pintu Rimba – Shelter 3 – Tugu Yuda – Puncak Kerinci",
    equipment: ["Jaket hujan dan lapisan hangat", "Headlamp dan baterai cadangan", "Filter air", "P3K dan perlengkapan navigasi"]
  },
  {
    id: "slamet",
    name: "Gunung Slamet",
    location: "Jawa Tengah",
    price: 45000,
    difficulty: "Sulit",
    duration: 3,
    availability: "Perlu cek kuota",
    height: 3428,
    quota: 22,
    quotaTotal: 120,
    coords: "7.2420° S, 109.2080° E",
    image: "asset/slamet.jpg",
    description: "Gunung tertinggi di Jawa Tengah dengan jalur panjang menuju puncak dan lanskap hutan pegunungan yang beragam.",
    route: "Basecamp Bambangan – Pondok Gembirung – Samaranthu – Plawangan – Puncak Slamet",
    equipment: ["Tenda tahan cuaca", "Jaket windproof", "Air minum yang cukup", "Headlamp dan P3K"]
  },
  {
    id: "sumbing",
    name: "Gunung Sumbing",
    location: "Jawa Tengah",
    price: 40000,
    difficulty: "Sulit",
    duration: 3,
    availability: "Tersedia",
    height: 3371,
    quota: 31,
    quotaTotal: 110,
    coords: "7.3840° S, 110.0700° E",
    image: "asset/sumbing.jpg",
    description: "Pendakian dengan tanjakan panjang, jalur punggungan terbuka, dan panorama pegunungan di kawasan Dataran Tinggi Dieng.",
    route: "Basecamp Garung – Pos 1 – Pestan – Pasar Watu – Puncak Sumbing",
    equipment: ["Jaket windproof", "Trekking pole", "Headlamp", "Persediaan air dan makanan"]
  },
  {
    id: "sindoro",
    name: "Gunung Sindoro",
    location: "Jawa Tengah",
    price: 35000,
    difficulty: "Menengah",
    duration: 2,
    availability: "Tersedia",
    height: 3153,
    quota: 38,
    quotaTotal: 100,
    coords: "7.3000° S, 109.9900° E",
    image: "asset/sindoro.jpg",
    description: "Jalur pendakian dengan sabana, punggungan terbuka, dan pemandangan Gunung Sumbing dari kawasan puncak.",
    route: "Basecamp Kledung – Pos 1 – Pos 2 – Pos 3 – Puncak Sindoro",
    equipment: ["Jaket hangat", "Topi dan pelindung matahari", "Headlamp", "Air minum minimal 2 Liter"]
  },
  {
    id: "gede",
    name: "Gunung Gede",
    location: "Jawa Barat",
    price: 35000,
    difficulty: "Menengah",
    duration: 2,
    availability: "Tersedia",
    height: 2958,
    quota: 45,
    quotaTotal: 100,
    coords: "6.7800° S, 106.9800° E",
    image: "asset/gede.webp",
    description: "Jalur hutan pegunungan menuju kawasan alun-alun Suryakencana yang dikenal dengan padang edelweiss.",
    route: "Cibodas – Telaga Biru – Kandang Badak – Alun-alun Suryakencana – Puncak Gede",
    equipment: ["Jas hujan", "Jaket hangat", "Botol minum isi ulang", "Perlengkapan P3K"]
  },
  {
    id: "ijen",
    name: "Gunung Ijen",
    location: "Jawa Timur",
    price: 30000,
    difficulty: "Menengah",
    duration: 1,
    availability: "Tersedia",
    height: 2799,
    quota: 55,
    quotaTotal: 100,
    coords: "8.0580° S, 114.2420° E",
    image: "asset/ijen.jpg",
    description: "Pendakian singkat menuju kawah vulkanik dan danau asam berwarna toska; ikuti aturan keselamatan kawasan.",
    route: "Paltuding – Pos Bunder – Bibir Kawah Ijen – Paltuding",
    equipment: ["Masker sesuai arahan pengelola", "Jaket hangat", "Headlamp", "Air minum"]
  },
  {
    id: "argopuro",
    name: "Gunung Argopuro",
    location: "Jawa Timur",
    price: 45000,
    difficulty: "Sulit",
    duration: 5,
    availability: "Perlu cek kuota",
    height: 3088,
    quota: 27,
    quotaTotal: 110,
    coords: "7.9700° S, 113.5700° E",
    image: "asset/argopuro.jpg",
    description: "Lintas alam jarak jauh melewati hutan, padang savana, dan situs Rengganis di kawasan Pegunungan Iyang.",
    route: "Baderan – Mata Air 1 – Cikasur – Cisentor – Rengganis – Bermi",
    equipment: ["Ransel untuk perjalanan beberapa hari", "Tenda dan sleeping bag", "Filter air", "Peta jalur dan P3K"]
  },
  {
    id: "arjuno-welirang",
    name: "Gunung Arjuno-Welirang",
    location: "Jawa Timur",
    price: 40000,
    difficulty: "Sulit",
    duration: 3,
    availability: "Perlu cek kuota",
    height: 3339,
    quota: 25,
    quotaTotal: 100,
    coords: "7.7667° S, 112.5833° E",
    image: "asset/arjuno-welirang.jpg",
    description: "Jalur pegunungan kompleks Arjuno-Welirang dengan hutan lereng, punggungan panjang, dan panorama kawasan Malang-Pasuruan.",
    route: "Tretes – Pet Bocor – Pondokan – Lembah Kidang – Puncak Arjuno",
    equipment: ["Jaket windproof dan lapisan hangat", "Headlamp", "Persediaan air dan makanan", "P3K serta perlengkapan navigasi"]
  },
  {
    id: "agung",
    name: "Gunung Agung",
    location: "Bali",
    price: 60000,
    difficulty: "Sulit",
    duration: 2,
    availability: "Perlu cek kuota",
    height: 3031,
    quota: 20,
    quotaTotal: 80,
    coords: "8.3430° S, 115.5080° E",
    image: "asset/agung.jpg",
    description: "Puncak tertinggi di Bali dengan jalur terjal dan panorama pulau; wajib memeriksa status aktivitas serta aturan setempat.",
    route: "Pura Pasar Agung – Pos pendakian – Puncak Selatan",
    equipment: ["Jaket windproof", "Headlamp", "Air minum cukup", "Perlengkapan darurat"]
  },
  {
    id: "tambora",
    name: "Gunung Tambora",
    location: "Nusa Tenggara Barat",
    price: 50000,
    difficulty: "Sulit",
    duration: 4,
    availability: "Perlu cek kuota",
    height: 2850,
    quota: 24,
    quotaTotal: 100,
    coords: "8.2500° S, 118.0000° E",
    image: "asset/tambora.jpg",
    description: "Lanskap vulkanik luas dengan kaldera raksasa dan jalur panjang yang membutuhkan perencanaan logistik matang.",
    route: "Desa Pancasila – Pos 1 – Pos 3 – Pos 5 – Bibir Kaldera Tambora",
    equipment: ["Tenda dan sleeping bag", "Perbekalan perjalanan beberapa hari", "Perlindungan dari matahari", "P3K dan alat navigasi"]
  },
  {
    id: "papandayan",
    name: "Gunung Papandayan",
    location: "Jawa Barat",
    price: 30000,
    difficulty: "Menengah",
    duration: 2,
    availability: "Tersedia",
    height: 2665,
    quota: 48,
    quotaTotal: 100,
    coords: "7.3195° S, 107.7317° E",
    image: "asset/papandayan.jpg",
    description: "Jalur populer melewati kawah, Hutan Mati, dan kawasan Pondok Saladah; tetap ikuti pembatasan area dari petugas.",
    route: "Camp David – Kawah Papandayan – Hutan Mati – Pondok Saladah – kembali",
    equipment: ["Masker untuk area berdebu", "Jaket hangat", "Sepatu trekking", "Air minum dan perlengkapan hujan"]
  },
  {
    id: "andong",
    name: "Gunung Andong",
    location: "Jawa Tengah",
    price: 20000,
    difficulty: "Mudah",
    duration: 1,
    availability: "Tersedia",
    height: 1726,
    quota: 58,
    quotaTotal: 100,
    coords: "7.3833° S, 110.3667° E",
    image: "asset/andong.jpeg",
    description: "Pendakian singkat dengan punggungan terbuka dan panorama pegunungan di sekitarnya; jaga jarak aman di jalur sempit.",
    route: "Basecamp Sawit – Pos 1 – Pos 2 – Puncak Andong – kembali",
    equipment: ["Sepatu dengan grip baik", "Jaket ringan", "Headlamp", "Air minum"]
  },
  {
    id: "raung",
    name: "Gunung Raung",
    location: "Jawa Timur",
    price: 55000,
    difficulty: "Sulit",
    duration: 4,
    availability: "Perlu cek kuota",
    height: 3332,
    quota: 15,
    quotaTotal: 80,
    coords: "8.1250° S, 114.0420° E",
    image: "asset/raung.jpg",
    description: "Pendakian panjang dengan medan punggungan dan kawah; rute puncak berteknis tinggi dan hanya untuk pendaki berpengalaman saat dibuka resmi.",
    route: "Basecamp Sumberwringin – Pondok Sumur – jalur puncak resmi – kembali",
    equipment: ["Perlengkapan teknis sesuai jalur resmi", "Tenda tahan cuaca", "Jaket windproof", "P3K dan alat navigasi"]
  },
  {
    id: "latimojong",
    name: "Gunung Latimojong (Rantemario)",
    location: "Sulawesi Selatan",
    price: 50000,
    difficulty: "Sulit",
    duration: 4,
    availability: "Perlu cek kuota",
    height: 3478,
    quota: 18,
    quotaTotal: 80,
    coords: "3.3830° S, 120.0200° E",
    image: "asset/latimojong.jpg",
    description: "Puncak tertinggi di Sulawesi dengan perjalanan lintas pos melalui hutan pegunungan dan kebutuhan logistik mandiri.",
    route: "Desa Karangan – Pos 1 hingga Pos 7 – Puncak Rantemario – kembali",
    equipment: ["Tenda dan sleeping bag", "Jas hujan", "Filter air", "Perbekalan beberapa hari dan P3K"]
  },
  {
    id: "binaiya",
    name: "Gunung Binaiya",
    location: "Maluku",
    price: 65000,
    difficulty: "Sulit",
    duration: 6,
    availability: "Perlu cek kuota",
    height: 3027,
    quota: 12,
    quotaTotal: 50,
    coords: "3.1720° S, 129.4570° E",
    image: "asset/binaya.jpg",
    description: "Pendakian lintas kawasan hutan di Pulau Seram yang memerlukan waktu, logistik, dan koordinasi dengan pengelola setempat.",
    route: "Desa Piliana – jalur pendakian resmi – puncak Binaiya – kembali melalui rute terdaftar",
    equipment: ["Tenda dan perlengkapan tidur", "Perbekalan beberapa hari", "Perlindungan hujan", "P3K, filter air, dan alat navigasi"]
  }
];

const createMountainIllustration = (index) => {
  const palettes = [
    ["#f3c98b", "#bb7350", "#473d39", "#1f2925"],
    ["#9dd2ce", "#6ca9a2", "#42645e", "#263a36"],
    ["#f4b77a", "#d27d59", "#8d5144", "#402f36"],
    ["#b2c9e8", "#718aa8", "#4d5e75", "#252e3d"]
  ];
  const [sky, horizon, peak, foreground] = palettes[index % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="${horizon}"/></linearGradient><linearGradient id="ground" x2="0" y2="1"><stop stop-color="${peak}"/><stop offset="1" stop-color="${foreground}"/></linearGradient></defs><path fill="url(#sky)" d="M0 0h1200v700H0z"/><circle cx="925" cy="145" r="62" fill="#ffe5ae" opacity=".8"/><path fill="${horizon}" opacity=".72" d="m0 430 185-140 105 85 180-215 220 260 155-180 355 190v270H0z"/><path fill="url(#ground)" d="m0 515 210-180 145 120 225-250 255 290 150-135 215 150v190H0z"/><path fill="${foreground}" opacity=".8" d="m0 590 245-145 170 120 175-95 205 125 205-150 200 115v140H0z"/><g fill="none" stroke="#fff" stroke-opacity=".23" stroke-width="3"><path d="M-40 510q190-100 390 0t390 0 500 0"/><path d="M-40 550q190-100 390 0t390 0 500 0"/><path d="M-40 590q190-100 390 0t390 0 500 0"/></g><path fill="#fff" opacity=".2" d="m565 250 15-45 33 37 34 8-42 7-25 34z"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

DESTINATIONS.forEach((destination, index) => {
  if (!destination.image) destination.image = createMountainIllustration(index);
});

/* ==========================================================================
   MOUNTAZ LAB EXTENSION — ALGORITHMS & DATA STRUCTURE CONTEXT
   ========================================================================== */

// 1. PENJELASAN POINTER: Menghubungkan alamat objek secara berantai di memori (Linked List)
function inisialisasiPointerLab() {
  for (let i = 0; i < DESTINATIONS.length - 1; i++) {
    // Properti '.next' bertindak sebagai pointer yang mereferensikan alamat objek berikutnya
    DESTINATIONS[i].next = DESTINATIONS[i + 1];
  }
}
// Eksekusi tautan pointer awal
inisialisasiPointerLab();


// 2. INDIKATOR 1: SORTING MANUAL (Selection Sort) + BACKEND LOG LOGGING
function backendSelectionSort(kriteria) {
  let arr = [...DESTINATIONS]; // Salin array asli agar referensi data awal aman
  let n = arr.length;
  
  console.log(`%c[SORT START] Mengurutkan data berdasarkan: ${kriteria}`, "color: #00f2fe; font-weight: bold;");

  for (let i = 0; i < n - 1; i++) {
    let indeksEkstrim = i;
    for (let j = i + 1; j < n; j++) {
      
      // Evaluasi Kondisi Berdasarkan Kriteria
      if (kriteria === "height" && arr[j].height > arr[indeksEkstrim].height) {
        indeksEkstrim = j;
      } else if (kriteria === "price" && arr[j].price < arr[indeksEkstrim].price) {
        indeksEkstrim = j;
      } else if (kriteria === "name" && arr[j].name.localeCompare(arr[indeksEkstrim].name) < 0) {
        indeksEkstrim = j;
      }
    }
    
    // Proses Swap/Penukaran posisi melalui manipulasi Pointer Referensi Objek
    if (indeksEkstrim !== i) {
      console.log(`[SWAP] Menukar data Indeks [${i}] ${arr[i].name} dengan Indeks [${indeksEkstrim}] ${arr[indeksEkstrim].name}`);
      let temp = arr[i];
      arr[i] = arr[indeksEkstrim];
      arr[indeksEkstrim] = temp;
    }
  }
  
  console.log("%c[SORT SELESAI] Data berhasil ditata kembali di RAM.", "color: #7ee787;");
  return arr;
}


// 3. INDIKATOR 2: SEARCHING MANUAL (Linear Search) + BACKEND LOG LOGGING
function backendLinearSearch(kataKunci) {
  let query = kataKunci.toLowerCase();
  let hasil = [];
  
  console.log(`%c[SEARCH START] Mencari kata kunci: "${kataKunci}"`, "color: #00f2fe; font-weight: bold;");

  // Penelusuran linier dari indeks awal (0) hingga batas akhir array (n-1)
  for (let i = 0; i < DESTINATIONS.length; i++) {
    console.log(`[Iterasi ke-${i}] Memeriksa alamat memori Node: ${DESTINATIONS[i].name}`);
    
    if (DESTINATIONS[i].name.toLowerCase().includes(query)) {
      console.log(`%c   [FOUND] Indeks ke-${i} cocok!`, "color: #7ee787;");
      hasil.push(DESTINATIONS[i]);
      
      // Menampilkan informasi Pointer dari data yang diketemukan
      if (DESTINATIONS[i].next) {
        console.log(`   [POINTER INFO] Node saat ini menunjuk ke alamat Node: ${DESTINATIONS[i].next.name}`);
      }
    }
  }
  
  if (hasil.length === 0) {
    console.log("%c[SEARCH GAGAL] Data tidak ditemukan.", "color: #ff7b72;");
  }
  return hasil;
}


const rupiah = (val) => `Rp${Number(val).toLocaleString("id-ID")}`;
const escapeHTML = (str) => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Export for module systems or global availability
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DESTINATIONS, rupiah, escapeHTML };
}
