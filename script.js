const mountains = [
  { name: "Prau", height: 2565, price: 15000, location: "Jawa Tengah" },
  { name: "Andong", height: 1726, price: 20000, location: "Jawa Tengah" },
  { name: "Merbabu", height: 3145, price: 25000, location: "Jawa Tengah" },
  { name: "Semeru", height: 3676, price: 30000, location: "Jawa Timur" },
  { name: "Rinjani", height: 3726, price: 50000, location: "Nusa Tenggara Barat" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Loader
window.addEventListener("load", () => {
  window.setTimeout(() => $("#pageLoader").classList.add("done"), 500);
});

// Navbar and mobile menu
const navbar = $("#navbar");
window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 35), { passive: true });
$("#menuToggle").addEventListener("click", () => {
  const opened = $("#navLinks").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(opened));
});
$$(".nav-link, .nav-cta, .brand").forEach(link => link.addEventListener("click", () => {
  $("#navLinks").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));

// Reveal sections on scroll
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => observer.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("visible"));
}

// Active nav
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
["home", "materi", "sorting", "searching"].forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});
// The algorithm workspace uses tabs within the sorting section; update nav for searching tab.
$$('[data-tab]').forEach(tab => tab.addEventListener("click", () => {
  if (tab.dataset.tab === "searchPanel") {
    $$(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#searching"));
    history.replaceState(null, "", "#searching");
  } else {
    $$(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#sorting"));
    history.replaceState(null, "", "#sorting");
  }
}));

// Concept modal content
const concepts = {
  array: {
    title: "Array",
    description: "Array adalah struktur data yang menyimpan sejumlah elemen dengan tipe yang sama pada urutan indeks. Dalam C++, indeks array dimulai dari 0, sehingga elemen pertama berada pada indeks 0.",
    example: '<div class="example-label">VISUALISASI INDEKS</div><div class="modal-array"><span>12<br><small>idx 0</small></span><span>24<br><small>idx 1</small></span><span>36<br><small>idx 2</small></span><span>48<br><small>idx 3</small></span></div>',
    code: "int ketinggian[] = {12, 24, 36, 48};\ncout << ketinggian[2]; // 36"
  },
  pointer: {
    title: "Pointer",
    description: "Pointer adalah variabel yang menyimpan alamat memori variabel lain. Operator & mengambil alamat, sedangkan * digunakan untuk mengakses nilai melalui pointer (dereference). Alamat di ilustrasi ini bersifat simulasi.",
    example: '<div class="example-label">HUBUNGAN POINTER</div><div class="modal-array"><span>nilai<br><small>42</small></span><span>alamat<br><small>0x01*</small></span><span>pointer<br><small>ptr →</small></span></div>',
    code: "int nilai = 42;\nint* ptr = &nilai;\ncout << *ptr; // 42"
  },
  struct: {
    title: "Struct",
    description: "Struct adalah tipe data bentukan yang mengelompokkan beberapa anggota dengan tipe data yang dapat berbeda. Cocok untuk merepresentasikan satu entitas, misalnya informasi gunung.",
    example: '<div class="example-label">OBJEK GUNUNG</div><div class="modal-array"><span>nama<br><small>Prau</small></span><span>tinggi<br><small>2565</small></span><span>lokasi<br><small>Jateng</small></span></div>',
    code: 'struct Gunung {\n    string nama;\n    int ketinggian;\n    string lokasi;\n};\nGunung prau = {"Prau", 2565, "Jateng"};'
  }
};
const modal = $("#conceptModal");
function openConcept(key) {
  const data = concepts[key];
  if (!data) return;
  $("#modalTitle").textContent = data.title;
  $("#modalDescription").textContent = data.description;
  $("#modalExample").innerHTML = data.example;
  $("#modalCode").textContent = data.code;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}
function closeConcept() { modal.hidden = true; document.body.style.overflow = ""; }
$$("[data-open]").forEach(card => {
  card.addEventListener("click", () => openConcept(card.dataset.open));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openConcept(card.dataset.open); }
  });
});
$("#modalClose").addEventListener("click", closeConcept);
$("#modalDone").addEventListener("click", closeConcept);
modal.addEventListener("click", event => { if (event.target === modal) closeConcept(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeConcept(); });

// Toast utility
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}
function timeStamp() {
  return new Date().toLocaleTimeString("id-ID", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
function appendLog(target, message, type = "") {
  const container = $(target);
  const p = document.createElement("p");
  const time = document.createElement("span");
  time.className = "log-time";
  time.textContent = `[${timeStamp()}]`;
  p.append(time, document.createTextNode(message));
  if (type) p.classList.add(type);
  container.appendChild(p);
  container.scrollTop = container.scrollHeight;
}
function clearLog(target, placeholder) {
  $(target).replaceChildren();
  const p = document.createElement("p");
  p.className = "log-muted";
  p.textContent = placeholder;
  $(target).appendChild(p);
}
function clearPlaceholder(target) {
  const log = $(target);
  if (log.querySelector(".log-muted")) log.replaceChildren();
}

// Sorting — Bubble Sort, one comparison per step
let sortState = {};
function getSortSource() {
  const key = $("#sortDataset").value;
  return mountains.map((m, i) => ({
    ...m, originalIndex: i,
    value: key === "height" ? m.height : m.price,
    label: key === "height" ? `${m.height} m` : `Rp${m.price.toLocaleString("id-ID")}`
  }));
}
function resetSort() {
  sortState = {
    data: getSortSource(), i: 0, j: 0, comparisons: 0, swaps: 0,
    done: false, started: false, step: 0, swappedThisPass: false
  };
  $("#sortStart").disabled = false;
  $("#sortNext").disabled = true;
  $("#compareCount").textContent = "0";
  $("#swapCount").textContent = "0";
  $("#stepCount").textContent = "0";
  $("#sortStatus").textContent = "Siap";
  clearLog("#sortLog", "/* Tekan “Mulai sorting” untuk memulai simulasi. */");
  renderSort();
}
function renderSort(active = [], swapped = []) {
  const visual = $("#sortVisual");
  visual.replaceChildren();
  const max = Math.max(...sortState.data.map(d => d.value), 1);
  sortState.data.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "sort-item";
    if (active.includes(index)) box.classList.add("comparing");
    if (swapped.includes(index)) box.classList.add("swapped");
    if (sortState.done) box.classList.add("sorted");
    const bar = document.createElement("div");
    bar.className = "sort-bar";
    bar.style.height = `${Math.max(24, 132 * item.value / max)}px`;
    bar.textContent = item.value.toLocaleString("id-ID");
    const value = document.createElement("span");
    value.className = "sort-value";
    value.textContent = item.name;
    const idx = document.createElement("small");
    idx.textContent = `indeks ${index}`;
    box.append(bar, value, idx);
    visual.appendChild(box);
  });
}
function startSort() {
  resetSort();
  sortState.started = true;
  $("#sortStart").disabled = true;
  $("#sortNext").disabled = false;
  $("#sortStatus").textContent = "Berjalan";
  const order = $("#sortOrder").value === "asc" ? "menaik" : "menurun";
  appendLog("#sortLog", `Memulai Bubble Sort berdasarkan ${$("#sortDataset").value === "height" ? "ketinggian" : "harga tiket simulasi"} (${order}).`);
  appendLog("#sortLog", `Data awal: [${sortState.data.map(d => d.value).join(", ")}]`);
  renderSort();
}
function nextSortStep() {
  if (!sortState.started || sortState.done) return;
  const arr = sortState.data;
  const n = arr.length;
  if (sortState.i >= n - 1) {
    finishSort();
    return;
  }
  if (sortState.j >= n - sortState.i - 1) {
    if (!sortState.swappedThisPass) {
      sortState.done = true;
      finishSort();
      return;
    }
    sortState.i++;
    sortState.j = 0;
    sortState.swappedThisPass = false;
    if (sortState.i >= n - 1) { finishSort(); return; }
  }
  const j = sortState.j;
  const a = arr[j], b = arr[j + 1];
  const ascending = $("#sortOrder").value === "asc";
  sortState.comparisons++;
  sortState.step++;
  clearPlaceholder("#sortLog");
  appendLog("#sortLog", `Langkah ${sortState.step}: membandingkan ${a.name} (${a.value.toLocaleString("id-ID")}) dan ${b.name} (${b.value.toLocaleString("id-ID")}).`);
  const shouldSwap = ascending ? a.value > b.value : a.value < b.value;
  let swapped = [];
  if (shouldSwap) {
    arr[j] = b; arr[j + 1] = a;
    sortState.swaps++;
    sortState.swappedThisPass = true;
    swapped = [j, j + 1];
    appendLog("#sortLog", `${a.value} ${ascending ? "lebih besar" : "lebih kecil"} dari ${b.value}; tukar kedua elemen.`, "log-success");
    appendLog("#sortLog", `Array sekarang: [${arr.map(d => d.value).join(", ")}]`);
  } else {
    appendLog("#sortLog", "Urutan pasangan sudah sesuai; tidak perlu pertukaran.");
  }
  sortState.j++;
  $("#compareCount").textContent = sortState.comparisons;
  $("#swapCount").textContent = sortState.swaps;
  $("#stepCount").textContent = sortState.step;
  renderSort(shouldSwap ? [] : [j, j + 1], swapped);
  if (sortState.i >= n - 1 || (sortState.j >= n - sortState.i - 1 && !sortState.swappedThisPass)) {
    // Keep final result available for a separate completion message on next click.
    $("#sortStatus").textContent = "Memproses";
  }
  if (sortState.j >= n - sortState.i - 1 && sortState.swappedThisPass && sortState.i + 1 >= n - 1) {
    finishSort();
  }
}
function finishSort() {
  if (sortState.done) return;
  sortState.done = true;
  sortState.started = false;
  $("#sortNext").disabled = true;
  $("#sortStart").disabled = false;
  $("#sortStatus").textContent = "Selesai";
  appendLog("#sortLog", `Sorting selesai. Hasil: [${sortState.data.map(d => d.value).join(", ")}].`, "log-success");
  appendLog("#sortLog", `Total ${sortState.comparisons} perbandingan dan ${sortState.swaps} pertukaran.`);
  renderSort();
}
$("#sortStart").addEventListener("click", startSort);
$("#sortNext").addEventListener("click", nextSortStep);
$("#sortReset").addEventListener("click", resetSort);
$("#sortDataset").addEventListener("change", resetSort);
$("#sortOrder").addEventListener("change", resetSort);
$("#clearSortLog").addEventListener("click", () => clearLog("#sortLog", "/* Log dikosongkan. Jalankan atau lanjutkan sorting. */"));
resetSort();

// Searching — Linear Search, one element per step
let searchState = {};
function resetSearch(keepInput = true) {
  searchState = { data: mountains.map((m, i) => ({ ...m, originalIndex: i })), key: "", field: "name", index: 0, checked: 0, found: -1, started: false, done: false };
  $("#searchNext").disabled = true;
  $("#checkedCount").textContent = "0";
  $("#activeIndex").textContent = "—";
  $("#searchResult").textContent = "—";
  $("#searchStatus").textContent = "Siap";
  clearLog("#searchLog", "/* Masukkan kata kunci, lalu tekan “Cari data”. */");
  renderSearch();
}
function renderSearch(active = -1, found = -1) {
  const visual = $("#searchVisual");
  visual.replaceChildren();
  searchState.data.forEach((item, i) => {
    const box = document.createElement("div");
    box.className = "search-item";
    if (i === active) box.classList.add("active");
    if (i === found) box.classList.add("found");
    const idx = document.createElement("small"); idx.textContent = `INDEX ${i}`;
    const name = document.createElement("strong"); name.textContent = item.name;
    const detail = document.createElement("span"); detail.textContent = `${item.height.toLocaleString("id-ID")} mdpl`;
    box.append(idx, name, detail); visual.appendChild(box);
  });
}
function startSearch() {
  const key = $("#searchKey").value.trim();
  if (!key) { toast("Masukkan kata kunci terlebih dahulu."); $("#searchKey").focus(); return; }
  searchState = { data: mountains.map((m, i) => ({ ...m, originalIndex: i })), key, field: $("#searchField").value, index: 0, checked: 0, found: -1, started: true, done: false };
  $("#searchNext").disabled = false;
  $("#checkedCount").textContent = "0"; $("#activeIndex").textContent = "—"; $("#searchResult").textContent = "—"; $("#searchStatus").textContent = "Berjalan";
  clearLog("#searchLog", "");
  appendLog("#searchLog", `Memulai Linear Search. Kata kunci: "${key}".`);
  appendLog("#searchLog", `Kriteria: ${searchState.field === "name" ? "nama gunung" : "ketinggian"}.`);
  renderSearch();
  nextSearchStep();
}
function nextSearchStep() {
  if (!searchState.started || searchState.done) return;
  clearPlaceholder("#searchLog");
  if (searchState.index >= searchState.data.length) {
    searchState.done = true; searchState.started = false;
    $("#searchNext").disabled = true; $("#searchStatus").textContent = "Tidak ditemukan";
    $("#searchResult").textContent = "Tidak ada";
    appendLog("#searchLog", `Seluruh ${searchState.data.length} elemen telah diperiksa. Data tidak ditemukan.`, "log-error");
    renderSearch(); return;
  }
  const i = searchState.index;
  const item = searchState.data[i];
  const matches = searchState.field === "name"
    ? item.name.toLocaleLowerCase("id-ID").includes(searchState.key.toLocaleLowerCase("id-ID"))
    : String(item.height) === searchState.key.replace(/[.,\s]/g, "");
  searchState.checked++;
  $("#checkedCount").textContent = searchState.checked;
  $("#activeIndex").textContent = i;
  appendLog("#searchLog", `Memeriksa indeks ${i}: ${item.name} (${searchState.field === "name" ? item.name : item.height}).`);
  if (matches) {
    searchState.found = i; searchState.done = true; searchState.started = false;
    $("#searchNext").disabled = true; $("#searchStatus").textContent = "Ditemukan";
    $("#searchResult").textContent = `Indeks ${i}`;
    appendLog("#searchLog", `Data "${item.name}" ditemukan pada indeks ${i}.`, "log-success");
    renderSearch(-1, i);
  } else {
    appendLog("#searchLog", "Data tidak cocok; lanjut ke elemen berikutnya.");
    searchState.index++;
    renderSearch(i, -1);
    if (searchState.index >= searchState.data.length) {
      searchState.done = true; searchState.started = false;
      $("#searchNext").disabled = true; $("#searchStatus").textContent = "Tidak ditemukan";
      $("#searchResult").textContent = "Tidak ada";
      appendLog("#searchLog", `Seluruh ${searchState.data.length} elemen telah diperiksa. Data tidak ditemukan.`, "log-error");
    }
  }
}
$("#searchStart").addEventListener("click", startSearch);
$("#searchNext").addEventListener("click", nextSearchStep);
$("#searchReset").addEventListener("click", () => resetSearch());
$("#clearSearchLog").addEventListener("click", () => clearLog("#searchLog", "/* Log dikosongkan. Jalankan pencarian untuk membuat log baru. */"));
$("#searchKey").addEventListener("keydown", e => { if (e.key === "Enter") startSearch(); });
resetSearch();

// Algorithm tabs
$$(".algo-tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".algo-tab").forEach(t => t.classList.toggle("active", t === tab));
  $$(".algorithm-workspace").forEach(panel => panel.classList.toggle("hidden", panel.id !== tab.dataset.tab));
  if (tab.dataset.tab === "searchPanel") {
    $("#searching").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
}));

// Ensure the Searching navbar link activates its workspace before scrolling to it.
const searchingNav = document.querySelector('.nav-link[href="#searching"]');
searchingNav.addEventListener("click", event => {
  event.preventDefault();
  const tab = document.querySelector('.algo-tab[data-tab="searchPanel"]');
  if (tab) tab.click();
  history.replaceState(null, "", "#searching");
  setTimeout(() => $("#searching").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 80);
});
