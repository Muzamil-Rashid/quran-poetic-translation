/**************************************
 * PDF.js WORKER
 **************************************/
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

/**************************************
 * DOM
 **************************************/
const listSection = document.getElementById("listSection");
const viewerSection = document.getElementById("viewerSection");
const surahListEl = document.getElementById("surahList");
const pdfViewer = document.getElementById("pdfViewer");
const backBtn = document.getElementById("backBtn");

/**************************************
 * SURAHS (114) + ABOUT
 **************************************/
const surahs = [
  { name: "About this Book ", type: "about", pdf: "data/about-this-book.pdf"},
  { name : "About Adfar", type: "about", pdf:"data/about -adfar.pdf"},

  { name: "Surah Fatiha", pdf: "data/al-fatiha  (1).pdf" },
  { name: "Surah An-Naba", pdf: "data/an-naba.pdf" },
  { name: "Surah An-Nazi'at", pdf: "data/al-naziat .pdf" },
  { name: "Surah Abasa", pdf: "data/al-abasa.pdf" },
  { name: "Surah At-Takwir", pdf: "data/at-takwir.pdf" },
  { name: "Surah Al-Infitar", pdf: "data/al-infitar.pdf" },
  { name: "Surah Al-Mutaffifin", pdf: "data/al-mutaffifin.pdf" },
  { name: "Surah Al-Inshiqaq", pdf: "data/al-inshiqaq.pdf" },
  { name: "Surah Al-Buruj", pdf: "data/al-buruj.pdf" },
  { name: "Surah At-Tariq", pdf: "data/at-tariq.pdf" },
  { name: "Surah Al-A'la", pdf: "data/al-a'la.pdf" },
  { name: "Surah Al-Ghashiyah", pdf: "data/al-gashiyah.pdf" },
  { name: "Surah Al-Fajr", pdf: "data/al-fajr.pdf" },
  { name: "Surah Al-Balad", pdf: "data/al-balad.pdf" },
  { name: "Surah Ash-Shams", pdf: "data/ash-shams.pdf" },
  { name: "Surah Al-Layl", pdf: "data/al-layl.pdf" },
  { name: "Surah Ad-Duha", pdf: "data/ad-duha.pdf" },
  { name: "Surah Ash-Sharh", pdf: "data/ash-sharh.pdf" },
  { name: "Surah At-Tin", pdf: "data/at-tin.pdf" },
  { name: "Surah Al-Alaq", pdf: "data/al-alaq.pdf" },
  { name: "Surah Al-Qadr", pdf: "data/al-qadr.pdf" },
  { name: "Surah Al-Bayyinah", pdf: "data/al-bayyinah.pdf" },
  { name: "Surah Az-Zalzalah", pdf: "data/az-zalzalah.pdf" },
  { name: "Surah Al-Adiyat", pdf: "data/al-adiyat.pdf" },
  { name: "Surah Al-Qari'ah", pdf: "data/al-qariah .pdf" },
  { name: "Surah At-Takathur", pdf: "data/at-takathur .pdf" },
  { name: "Surah Al-Asr", pdf: "data/al-asr.pdf" },
  { name: "Surah Al-Humazah", pdf: "data/al-humazah.pdf" },
  { name: "Surah Al-Fil", pdf: "data/al-fil.pdf" },
  { name: "Surah Quraish", pdf: "data/quraish.pdf" },
  { name: "Surah Al-Ma'un", pdf: "data/al-maun.pdf" },
  { name: "Surah Al-Kawthar", pdf: "data/al-kawthar.pdf" },
  { name: "Surah Al-Kafirun", pdf: "data/al-kafirun.pdf" },
  { name: "Surah An-Nasr", pdf: "data/an-nasr.pdf" },
  { name: "Surah Al-Masad", pdf: "data/al-masad.pdf" },
  { name: "Surah Al-Ikhlas", pdf: "data/al-ikhlas.pdf" },
  { name: "Surah Al-Falaq", pdf: "data/al-falaq (1).pdf" },
  { name: "Surah An-Nas", pdf: "data/al-nas.pdf" }
];


/**************************************
 * RENDER LIST
 **************************************/
surahs.forEach(item => {
  const li = document.createElement("li");

  if (typeof item === "string") {
    li.textContent = "Surah " + item;
    li.onclick = () => openPDF("");
  } else {
    li.textContent = item.name;
    
    // Only add 'about' class if it is specifically the about item
    if (item.type === "about") {
      li.classList.add("about");
    }
    
    li.onclick = () => openPDF(item.pdf);
  }

  surahListEl.appendChild(li);
});

/**************************************
 * OPEN VIEWER
 **************************************/
function openPDF(pdfPath) {
  listSection.style.display = "none";
  viewerSection.style.display = "block";
  pdfViewer.innerHTML = "";

  if (!pdfPath) {
    pdfViewer.innerHTML = "<p><strong>PDF will be available soon.</strong></p>";
    return;
  }

  renderPDF(pdfPath);
}

/**************************************
 * RENDER PDF (RESPONSIVE + SHARP)
 **************************************/
function renderPDF(pdfPath) {
  pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    for (let p = 1; p <= pdf.numPages; p++) {
      pdf.getPage(p).then(page => {
        const containerWidth = pdfViewer.clientWidth;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / unscaledViewport.width;

        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Enhance quality: Use specific high DPR or device's DPR, whichever is higher (min 2.0 for sharpness)
        const dpr = Math.max(window.devicePixelRatio || 1, 2.5); 
        
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const transform = [dpr, 0, 0, dpr, 0, 0];

        pdfViewer.appendChild(canvas);

        page.render({
          canvasContext: ctx,
          viewport,
          transform
        });
      });
    }
  });
}

/**************************************
 * BACK
 **************************************/
backBtn.onclick = () => {
  viewerSection.style.display = "none";
  listSection.style.display = "block";
  pdfViewer.innerHTML = "";
};














