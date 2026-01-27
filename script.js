pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const listSection = document.getElementById("listSection");
const viewerSection = document.getElementById("viewerSection");
const surahListEl = document.getElementById("surahList");
const pdfViewer = document.getElementById("pdfViewer");
const backBtn = document.getElementById("backBtn");



const surahs = [
  { name: "About Adfar", type: "about", pdf: "Data/About.pdf" },

  { name: "Surah Al-Fatiha", pdf: "pdfs/surahs/al-fatiha.pdf" },
  { name: "Surah Al-Baqarah", pdf: "pdfs/surahs/al-baqrah.pdf" },
  { name: "Surah Aal-e-Imran", pdf: "pdfs/surahs/aal-imran.pdf" },
  { name: "Surah An-Nisa", pdf: "pdfs/surahs/an-nisa.pdf" },
  { name: "Surah Al-Ma'idah", pdf: "pdfs/surahs/al-maidah.pdf" },
  { name: "Surah Al-An'am", pdf: "pdfs/surahs/al-anam.pdf" },
  { name: "Surah Al-A'raf", pdf: "pdfs/surahs/al-araf.pdf" },
  { name: "Surah Al-Anfal", pdf: "pdfs/surahs/al-anfal.pdf" },
  { name: "Surah At-Tawbah", pdf: "pdfs/surahs/at-tawbah.pdf" },
  { name: "Surah Yunus", pdf: "pdfs/surahs/yunus.pdf" },
  { name: "Surah Hud", pdf: "pdfs/surahs/hud.pdf" },
  { name: "Surah Yusuf", pdf: "pdfs/surahs/yusuf.pdf" }
  // 👉 baaki surahs isi pattern pe add karte jao
];


/* RENDER LIST */
surahs.forEach(item => {
  const li = document.createElement("li");

  if (typeof item === "string") {
    li.textContent = "Surah " + item;
    li.onclick = () => openPDF("");
  } else {
    li.textContent = item.name;
    li.classList.add("about");
    li.onclick = () => openPDF(item.pdf);
  }

  surahListEl.appendChild(li);
});

/* OPEN VIEWER */
function openPDF(pdfPath) {
  listSection.style.display = "none";
  viewerSection.style.display = "block";
  pdfViewer.innerHTML = "";

  if (!pdfPath) {
    pdfViewer.innerHTML = "<p><strong>PDF will be available soon.</strong></p>";
    return;
  }

  pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    for (let p = 1; p <= pdf.numPages; p++) {
      pdf.getPage(p).then(page => {
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.margin = "15px auto";
        canvas.style.display = "block";

        pdfViewer.appendChild(canvas);

        page.render({ canvasContext: ctx, viewport });
      });
    }
  });
}

/* BACK */
backBtn.onclick = () => {
  viewerSection.style.display = "none";
  listSection.style.display = "block";
  pdfViewer.innerHTML = "";
};

