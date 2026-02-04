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
  { name : "About Adfar", type: "about", pdf:""},
  
  { name: "Surah An-Naba", pdf: "" },
  { name: "Surah An-Nazi'at", pdf: "" },
  { name: "Surah Abasa", pdf: "" },
  { name: "Surah At-Takwir", pdf: "" },
  { name: "Surah Al-Infitar", pdf: "" },
  { name: "Surah Al-Mutaffifin", pdf: "" },
  { name: "Surah Al-Inshiqaq", pdf: "" },
  { name: "Surah Al-Buruj", pdf: "" },
  { name: "Surah At-Tariq", pdf: "" },
  { name: "Surah Al-A'la", pdf: "" },
  { name: "Surah Al-Ghashiyah", pdf: "" },
  { name: "Surah Al-Fajr", pdf: "" },
  { name: "Surah Al-Balad", pdf: "" },
  { name: "Surah Ash-Shams", pdf: "" },
  { name: "Surah Al-Layl", pdf: "" },
  { name: "Surah Ad-Duha", pdf: "" },
  { name: "Surah Ash-Sharh", pdf: "" },
  { name: "Surah At-Tin", pdf: "" },
  { name: "Surah Al-Alaq", pdf: "" },
  { name: "Surah Al-Qadr", pdf: "" },
  { name: "Surah Al-Bayyinah", pdf: "" },
  { name: "Surah Az-Zalzalah", pdf: "" },
  { name: "Surah Al-Adiyat", pdf: "" },
  { name: "Surah Al-Qari'ah", pdf: "" },
  { name: "Surah At-Takathur", pdf: "" },
  { name: "Surah Al-Asr", pdf: "" },
  { name: "Surah Al-Humazah", pdf: "" },
  { name: "Surah Al-Fil", pdf: "" },
  { name: "Surah Quraish", pdf: "" },
  { name: "Surah Al-Ma'un", pdf: "" },
  { name: "Surah Al-Kawthar", pdf: "" },
  { name: "Surah Al-Kafirun", pdf: "" },
  { name: "Surah An-Nasr", pdf: "" },
  { name: "Surah Al-Masad", pdf: "" },
  { name: "Surah Al-Ikhlas", pdf: "" },
  { name: "Surah Al-Falaq", pdf: "" },
  { name: "Surah An-Nas", pdf: "" }
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








