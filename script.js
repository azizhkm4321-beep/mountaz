const MOUNTAINS = [
  { name: "Prau", height: 2565, price: 15000, location: "Jawa Tengah" },
  { name: "Andong", height: 1726, price: 20000, location: "Jawa Tengah" },
  { name: "Merbabu", height: 3145, price: 25000, location: "Jawa Tengah" },
  { name: "Semeru", height: 3676, price: 30000, location: "Jawa Timur" },
  { name: "Rinjani", height: 3726, price: 50000, location: "Nusa Tenggara Barat" }
];

const CONCEPTS = {
  array: {
    title: "Array",
    desc: "Array menyimpan sejumlah elemen bertipe sama pada urutan indeks. Di C++, indeks dimulai dari 0, sehingga elemen pertama berada di indeks 0.",
    ex: [["12", "idx 0"], ["24", "idx 1"], ["36", "idx 2"], ["48", "idx 3"]],
    code: "int ketinggian[] = {12, 24, 36, 48};\ncout << ketinggian[2]; // 36"
  },
  pointer: {
    title: "Pointer",
    desc: "Pointer adalah variabel yang menyimpan alamat memori variabel lain. Operator & mengambil alamat, sedangkan * dipakai untuk mengakses nilai di alamat tersebut.",
    ex: [["42", "nilai"], ["0x01", "alamat"], ["ptr →", "pointer"]],
    code: "int nilai = 42;\nint* ptr = &nilai;\ncout << *ptr; // 42"
  },
  struct: {
    title: "Struct",
    desc: "Struct mengelompokkan beberapa anggota dengan tipe data yang boleh berbeda. Cocok untuk merepresentasikan satu entitas, misalnya informasi gunung.",
    ex: [["Prau", "nama"], ["2565", "tinggi"], ["Jateng", "lokasi"]],
    code: 'struct Gunung {\n    string nama;\n    int ketinggian;\n    string lokasi;\n};\nGunung prau = {"Prau", 2565, "Jateng"};'
  }
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const fmt = (n) => n.toLocaleString("id-ID");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Loader, progress bar, navbar ===== */
const hideLoader = () => $("#loader").classList.add("done");
addEventListener("load", () => setTimeout(hideLoader, 300));
setTimeout(hideLoader, 2500);

addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#navbar").classList.toggle("scrolled", scrollY > 30);
  $("#progress").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

/* ===== Toast ===== */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ===== Tema gelap / terang ===== */
$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("mountaz-theme", next); } catch (e) {}
  toast(next === "dark" ? "Mode gelap aktif" : "Mode terang aktif");
});

/* ===== Menu mobile ===== */
const menuBtn = $("#menuToggle"), navLinks = $("#navLinks");
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$(".nav-link").forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* ===== Animasi saat scroll ===== */
function countUp(el) {
  const end = +el.dataset.count, t0 = performance.now();
  el.textContent = "0";
  const tick = (now) => {
    const p = Math.min((now - t0) / 1000, 1);
    el.textContent = Math.round(end * p);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const revealIO = new IntersectionObserver((entries) =>
    const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(countUp);
    revealIO.unobserve(e.target);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => (reduceMotion ? el.classList.add("in") : revealIO.observe(el)));

const navIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    $$(".nav-link").forEach((a) => a.classList.toggle("active", a.hash === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "materi", "sorting", "searching"].forEach((id) => navIO.observe(document.getElementById(id)));

/* ===== Modal konsep ===== */
const modal = $("#modal");
let lastFocus = null, hideTimer = null;

function openConcept(key) {
  const c = CONCEPTS[key];
  lastFocus = document.activeElement;
  $("#modalTitle").textContent = c.title;
  $("#modalDesc").textContent = c.desc;
  $("#modalExample").innerHTML = c.ex.map(([v, s]) => `<span>${v}<small>${s}</small></span>`).join("");
  $("#modalCode").textContent = c.code;
  clearTimeout(hideTimer);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    modal.classList.add("open");
    $("#modalClose").focus();
  });
}

function closeConcept() {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  hideTimer = setTimeout(() => (modal.hidden = true), 300);
  lastFocus?.focus();
}

$$("[data-concept]").forEach((b) => b.addEventListener("click", () => openConcept(b.dataset.concept)));
$("#modalClose").addEventListener("click", closeConcept);
$("#modalDone").addEventListener("click", closeConcept);
modal.addEventListener("click", (e) => { if (e.target === modal) closeConcept(); });
modal.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const first = $("#modalClose"), last = $("#modalDone");
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeConcept(); setMenu(false); }
});

/* ===== Pemutar otomatis & log ===== */
function player(stepFn, btn) {
  let timer = null;
  const stop = () => {
    clearInterval(timer);
    timer = null;
    btn.textContent = "Putar ▶";
  };
  btn.addEventListener("click", () => {
    if (timer) return stop();
    btn.textContent = "Jeda ⏸";
    timer = setInterval(() => { if (!stepFn()) stop(); }, 550);
  });
  return stop;
}

function log(id, msg, cls = "") {
  const box = $("#" + id);
  box.querySelector(".muted")?.remove();
  const p = document.createElement("p");
  p.className = cls;
  const time = document.createElement("span");
  time.className = "t";
  time.textContent = `[${new Date().toLocaleTimeString("id-ID", { hour12: false })}]`;
  p.append(time, msg);
  box.append(p);
  box.scrollTop = box.scrollHeight;
}

/* ===== Bubble Sort ===== */
let sItems = [], sGen = null, sMax = 1, sCmp = 0, sSwap = 0, sPass = 0;
const stopSort = player(sortStep, $("#sortPlay"));

function* bubbleSteps(list, asc) {
  const arr = [...list];
  const n = arr.length;
  for (let p = 0; p < n - 1; p++) {
    let swapped = false;
    for (let j = 0; j < n - p - 1; j++) {
      const a = arr[j], b = arr[j + 1];
      const need = asc ? a.value > b.value : a.value < b.value;
      yield { t: "cmp", j, a, b, need, arr: [...arr] };
      if (need) {
        [arr[j], arr[j + 1]] = [b, a];
        swapped = true;
        yield { t: "swap", j, a, b, arr: [...arr] };
      }
    }
    yield { t: "pass", p, sorted: n - p - 1, arr: [...arr] };
    if (!swapped) break;
  }
  yield { t: "done", arr: [...arr] };
}

function renderSort(arr, hl = [], sortedFrom = arr.length) {
  arr.forEach((it, pos) => {
    const el = it.el;
    el.style.left = `calc(${(pos / arr.length) * 100}% + 6px)`;
    el.style.width = `calc(${100 / arr.length}% - 12px)`;
    el.style.height = `${Math.max(64, (it.value / sMax) * 200)}px`;
    el.firstElementChild.textContent = `[${pos}]`;
    el.classList.toggle("hl", hl.includes(pos));
    el.classList.toggle("done", pos >= sortedFrom);
  });
}

function sortStats() {
  $("#sortCmp").textContent = sCmp;
  $("#sortSwap").textContent = sSwap;
  $("#sortPass").textContent = sPass;
}

function sortSetup() {
  stopSort();
  const byHeight = $("#sortDataset").value === "height";
  sItems = MOUNTAINS.map((m) => ({ name: m.name, value: byHeight ? m.height : m.price }));
  sMax = Math.max(...sItems.map((it) => it.value));
  sGen = null;
  sCmp = sSwap = sPass = 0;
  $("#sortStage").replaceChildren(...sItems.map((it) => {
    it.el = document.createElement("div");
    it.el.className = "bar";
    it.el.innerHTML = `<small></small><span class="val">${fmt(it.value)}</span><span class="nm">${it.name}</span>`;
    return it.el;
  }));
  renderSort(sItems);
  sortStats();
  $("#sortNext").disabled = true;
  $("#sortPlay").disabled = true;
  $("#sortStatus").textContent = "Siap";
  $("#sortLog").innerHTML = '<p class="muted">Tekan “Mulai sorting” untuk memulai.</p>';
}

function sortStart() {
  sortSetup();
  const asc = $("#sortOrder").value === "asc";
  sGen = bubbleSteps(sItems, asc);
  $("#sortNext").disabled = false;
  $("#sortPlay").disabled = false;
  $("#sortStatus").textContent = "Berjalan";
  log("sortLog", `Mulai Bubble Sort (${asc ? "kecil ke besar" : "besar ke kecil"}). Data awal: [${sItems.map((x) => fmt(x.value)).join(", ")}]`);
}

function sortStep() {
  const r = sGen?.next();
  if (!r || r.done) return false;
  const s = r.value;
  if (s.t === "cmp") {
    sCmp++;
    renderSort(s.arr, [s.j, s.j + 1]);
    log("sortLog", `Bandingkan ${s.a.name} (${fmt(s.a.value)}) dan ${s.b.name} (${fmt(s.b.value)}): ${s.need ? "perlu ditukar" : "sudah sesuai"}.`);
  } else if (s.t === "swap") {
    sSwap++;
    renderSort(s.arr, [s.j, s.j + 1]);
    log("sortLog", `Tukar posisi ${s.j} dan ${s.j + 1}.`, "ok");
  } else if (s.t === "pass") {
    sPass++;
    renderSort(s.arr, [], s.sorted);
    log("sortLog", `Pass ${sPass} selesai. Posisi ${s.sorted} sampai akhir sudah terurut.`);
  } else {
    renderSort(s.arr, [], 0);
    log("sortLog", `Selesai! Hasil: [${s.arr.map((x) => fmt(x.value)).join(", ")}]`, "ok");
    $("#sortStatus").textContent = "Selesai";
    $("#sortNext").disabled = true;
    $("#sortPlay").disabled = true;
    stopSort();
    sortStats();
    return false;
  }
  sortStats();
  return true;
}

/* ===== Linear Search ===== */
let qGen = null, qChecked = 0;
const stopSearch = player(searchStep, $("#searchPlay"));

function* linearSteps(list, key, field) {
  for (let i = 0; i < list.length; i++) {
    const m = list[i];
    const hit = field === "name"
      ? m.name.toLowerCase().includes(key.toLowerCase())
      : m.height === Number(key.replace(/\D/g, ""));
    yield { t: "check", i, m, hit };
    if (hit) return;
  }
  yield { t: "miss" };
}

function searchSetup() {
  stopSearch();
  qGen = null;
  qChecked = 0;
  $("#searchGrid").replaceChildren(...MOUNTAINS.map((m, i) => {
    const el = document.createElement("div");
    el.className = "s-item";
    el.innerHTML = `<small>INDEKS ${i}</small><strong>${m.name}</strong><span>${fmt(m.height)} mdpl</span>`;
    return el;
  }));
  $("#searchChecked").textContent = "0";
  $("#searchActive").textContent = "—";
  $("#searchResult").textContent = "—";
  $("#searchStatus").textContent = "Siap";
  $("#searchNext").disabled = true;
  $("#searchPlay").disabled = true;
  $("#searchLog").innerHTML = '<p class="muted">Masukkan kata kunci, lalu tekan “Cari data”.</p>';
}

function searchStart() {
  const key = $("#searchKey").value.trim();
  if (!key) {
    toast("Masukkan kata kunci terlebih dahulu.");
    $("#searchKey").focus();
    return;
  }
  searchSetup();
  qGen = linearSteps(MOUNTAINS, key, $("#searchField").value);
  $("#searchNext").disabled = false;
  $("#searchPlay").disabled = false;
  $("#searchStatus").textContent = "Berjalan";
  log("searchLog", `Mulai Linear Search untuk "${key}".`);
}

function searchStep() {
  const r = qGen?.next();
  if (!r || r.done) return false;
  const s = r.value;
  const cells = [...$("#searchGrid").children];
  if (s.t === "check") {
    qChecked++;
    cells.forEach((c, k) => (c.className = "s-item" + (k === s.i ? " active" : k < s.i ? " checked" : "")));
    $("#searchChecked").textContent = qChecked;
    $("#searchActive").textContent = s.i;
    if (!s.hit) {
      log("searchLog", `Indeks ${s.i}: ${s.m.name} tidak cocok, lanjut ke elemen berikutnya.`);
      return true;
    }
    cells[s.i].className = "s-item found";
    $("#searchResult").textContent = `Indeks ${s.i}`;
    $("#searchStatus").textContent = "Ditemukan";
    log("searchLog", `Data "${s.m.name}" ditemukan pada indeks ${s.i}.`, "ok");
  } else {
    $("#searchResult").textContent = "Tidak ada";
    $("#searchStatus").textContent = "Tidak ditemukan";
    log("searchLog", "Seluruh elemen sudah diperiksa, data tidak ditemukan.", "err");
  }
  $("#searchNext").disabled = true;
  $("#searchPlay").disabled = true;
  stopSearch();
  return false;
}

/* ===== Event & inisialisasi ===== */
$("#sortStart").addEventListener("click", sortStart);
$("#sortNext").addEventListener("click", sortStep);
$("#sortReset").addEventListener("click", sortSetup);
$("#sortDataset").addEventListener("change", sortSetup);
$("#sortOrder").addEventListener("change", sortSetup);
$("#searchStart").addEventListener("click", searchStart);
$("#searchNext").addEventListener("click", searchStep);
$("#searchReset").addEventListener("click", searchSetup);
$("#searchKey").addEventListener("keydown", (e) => { if (e.key === "Enter") searchStart(); });

sortSetup(); 
searchSetup();})