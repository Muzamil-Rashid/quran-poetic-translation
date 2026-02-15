/**************************************
 * PDF.js WORKER
 **************************************/
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

/**************************************
 * DOM ELEMENTS
 **************************************/
const homeSection = document.getElementById("homeSection");
const listSection = document.getElementById("listSection");
const viewerSection = document.getElementById("viewerSection");
const surahListEl = document.getElementById("surahList");
const pdfViewer = document.getElementById("pdfViewer");
const backBtn = document.getElementById("backBtn");

// State to track where "Back" should go
let currentView = "home"; // 'home', 'list-amma', 'list-sadaye', 'viewer'
let lastListView = "home"; // 'home', 'list-amma', 'list-sadaye'

/**************************************
 * DATA: AMMA PARA (Surahs)
 **************************************/
const ammaSurahs = [
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
 * DATA: SADAYE SIAM (Placeholder)
 **************************************/
// Placeholder list of 24 items - Manually defined array for user customization
const sadayeSiamList = [
  { name: "دل سی اندر چم گلشنک گلزار مزمل", pdf: "data/دل سی اندر چم گلشنک گلزار مزمل.pdf" },
  { name: "چم کراؤ صبحکہ  واوہ پوشن از تمنا دراؤ", pdf: "data/چم کراؤ صبحکہ  واوہ پوشن از تمنا دراؤ .pdf" },
  { name: "چھک ماہ رمضانک بہار", pdf: "data/چھک ماہ رمضانک بہار.pdf" },
  { name: "ہوش دارہ گوش تھاؤ پوشن چھه کراؤ", pdf: "data/ہوش دارہ گوش تھاؤ پوشن چھه کراؤ.pdf" },
  { name: "اسی لول برو لول برو ماہ رمضانس ", pdf: "data/اسی لول برو لول برو ماہ رمضانس .pdf" },
  { name: "شاہ خیر الانعام السلام السلام", pdf: "data/شاہ خیر الانعام السلام السلام.pdf" },
  { name: "مہ ماہ تمام جمال محمد", pdf: "data/مہ ماہ تمام جمال محمد.pdf" },
  { name: "سوز ذاتن شوب سانی قدردانی چانی چھم", pdf: "data/سوز ذاتن شوب سانی قدردانی چانی چھم .pdf" },
  { name: "یتھ منز چھہ رحمت سی پہر  وقت سحر وقت سحر", pdf: "data/یتھ منز چھہ رحمت سی پہر  وقت سحر وقت سحر.pdf" },
  { name: "چُمم  ذرُن مشکل گژھُن چونُوی  جُدا", pdf: "data/چُمم  ذرُن مشکل گژھُن چونُوی  جُدا.pdf" },
  { name: "رأضی  روزُن توہنہ روزہ دارن", pdf: "data/رأضی  روزُن توہنہ روزہ دارن.pdf" },
  { name: "نیہ فُج تہ واوو تُل قدم", pdf: "data/نیہ فُج تہ واوو تُل قدم.pdf" },
  { name: "لا الہ الا اللہ رب القاسم", pdf: "data/لا الہ الا اللہ رب القاسم.pdf" },
  { name: "خاتون جنت فاطمہ رضی اللہ تعالی عنہ", pdf: "data/خاتون جنت فاطمہ رضی اللہ تعالی عنہ.pdf" },
  { name: "توہُند سرتاج شہ دو جہان خدیجہ رضی اللہ تعالی عنہا", pdf: "data/توہُند سرتاج شہ دو جہان خدیجہ رضی اللہ تعالی عنہا.pdf" },
  { name: "عائشہ (رضی اللہ تعالی عنہا) چھہ علمٔہ دفتر", pdf: "data/عائشہ (رضی اللہ تعالی عنہا) چھہ علمٔہ دفتر.pdf" },
  { name: "نعت محمد ذاتہ نئی وون نعتہ کے ناوک قسم", pdf: "data/نعت محمد ذاتہ نئی وون نعتہ کے ناوک قسم.pdf" },
  { name: "یا محمد رسول لول چون آؤ", pdf: "data/یا محمد رسول لول چون آؤ.pdf" },
  { name: "ایف الله الله دمبدم پر", pdf: "data/ایف الله الله دمبدم پر.pdf" },
  { name: "چُھس حَژد لَہ چُھس حَژد لَہ چُھم حَژَر", pdf: "data/چُھس حَژد لَہ چُھس حَژد لَہ چُھم حَژَر.pdf" },
  { name: "صدا بوزُم مُد عا نیر یم گدا چُھسی یا رسول الله", pdf: "data/صدا بوزُم مُد عا نیر یم گدا چُھسی یا رسول الله.pdf" },
  { name: "لَيلَةُ القدر اٰيةُ الفُرقان", pdf: "data/لَيلَةُ القدر اٰيةُ الفُرقان.pdf" },
  { name: "اہے ماہ رمضان کے بہار", pdf: "data/اہے ماہ رمضان کے بہار (1).pdf" },
  { name: "ولو نازنینو وندی زو بہ پادن", pdf: "data/ولو نازنینو وندی زو بہ پادن.pdf" }
];


/**************************************
 * NAVIGATION
 **************************************/

function showHome() {
  homeSection.style.display = "block";
  listSection.style.display = "none";
  viewerSection.style.display = "none";
  currentView = "home";
  window.scrollTo(0, 0);
}

function showList(type) {
  homeSection.style.display = "none";
  listSection.style.display = "block";
  viewerSection.style.display = "none";

  if (type === 'amma') {
    renderAmmaList();
    currentView = "list-amma";
    lastListView = "list-amma";
  } else if (type === 'sadaye') {
    renderSadayeList();
    currentView = "list-sadaye";
    lastListView = "list-sadaye";
  }
  window.scrollTo(0, 0);
}

function openPDF(pdfPath) {
  // If opening directly from Home (About Adfar/Rhyme), set view accordingly
  if (currentView === "home") {
    lastListView = "home"; // So back button goes to home
  }

  homeSection.style.display = "none";
  listSection.style.display = "none";
  viewerSection.style.display = "block";

  currentView = "viewer";
  pdfViewer.innerHTML = "";

  if (!pdfPath) {
    pdfViewer.innerHTML = "<p style='text-align:center; padding: 20px;'><strong>PDF will be available soon.</strong></p>";
    return;
  }

  renderPDF(pdfPath);
}

/**************************************
 * RENDER LISTS
 **************************************/
function renderAmmaList() {
  surahListEl.innerHTML = "";

  // 0. Create Header Layout (Back + About)
  const headerDiv = document.createElement("div");
  headerDiv.className = "list-header";

  // Back Button (Small)
  const backToHomeBtn = document.createElement("button");
  backToHomeBtn.innerHTML = "←"; // Simple arrow
  backToHomeBtn.className = "list-back-btn";
  backToHomeBtn.title = "Back to Home";
  backToHomeBtn.onclick = () => showHome();
  headerDiv.appendChild(backToHomeBtn);

  // About Button (Fills Rest)
  const aboutBtn = document.createElement("div"); // Using div to act like button/li
  aboutBtn.textContent = "About this Book";
  aboutBtn.className = "about";
  // Copy styles from LI to make it look consistent, or rely on .about class
  // Since 'about' class in CSS targets #surahList li.about, we need to ensure this div gets same style
  // Or better, just style .list-header .about in CSS to match.
  // Let's add the click handler.
  aboutBtn.onclick = () => openPDF("data/about-this-book.pdf");

  // Apply visual styles to match existing List Items
  // Since we pulled it out of the UL, we need to apply the li styles manually or use a helper class
  // Let's rely on the CSS update we made to `.list-header .about`
  // We also need base styles: background, border, etc.
  // Actually, let's keep it simple: Make 'aboutBtn' an LI? No, UL cannot be inside a DIV inside UL??
  // Wait, surahListEl is the UL. We usually append LIs to it. 
  // User wants them in ONE ROW. Standard UL/LI cannot do flex row easily mixed with flex wrap items unless we structure carefully.
  // Hack: We will inject the 'headerDiv' BEFORE the UL in the listSection, OR as the first LI?
  // If we make the first LI a flex container, that works.

  const headerLi = document.createElement("li");
  headerLi.style.background = "transparent";
  headerLi.style.border = "none";
  headerLi.style.padding = "0";
  headerLi.style.boxShadow = "none";
  headerLi.style.cursor = "default";
  headerLi.className = "list-header-li"; // Helper class if needed
  headerLi.style.width = "100%"; // Full width to contain the row
  headerLi.style.display = "block"; // Override flex if inherited issues

  headerLi.appendChild(headerDiv);

  // Re-add About button logic
  // Since we are inside the headerDiv, let's create the About Element
  const aboutEl = document.createElement("div");
  aboutEl.textContent = "About this Book";
  aboutEl.className = "about"; // Will pick up the yellow style from CSS
  // We need to ensure it looks like a button. 
  // The CSS `#surahList li.about` targets LI. We might need to adjust CSS to `#surahList .about` or duplicate styles.
  // Let's assume we adjusted CSS or we manually add the 'li' classes.
  // Actually, easiest way: 
  aboutEl.style.cssText = "background: #c3a006; border: 2px solid #010407; color: #fff; font-weight: 700; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 12px 5px; font-size: 0.9rem; border-radius: 20px; cursor: pointer; text-align: center; display: flex; align-items: center; justify-content: center;";

  aboutEl.onclick = () => openPDF("data/about-this-book.pdf");
  headerDiv.appendChild(aboutEl);

  surahListEl.appendChild(headerLi);

  // 2. Add Surahs
  ammaSurahs.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.onclick = () => openPDF(item.pdf);
    surahListEl.appendChild(li);
  });
}

function renderSadayeList() {
  surahListEl.innerHTML = "";

  // 0. Create Header Layout (Back Button Only, Left Aligned)
  const headerLi = document.createElement("li");
  headerLi.style.background = "transparent";
  headerLi.style.border = "none";
  headerLi.style.padding = "0";
  headerLi.style.boxShadow = "none";
  headerLi.style.cursor = "default";
  headerLi.style.width = "100%";

  const backToHomeBtn = document.createElement("button");
  backToHomeBtn.innerHTML = "←";
  backToHomeBtn.className = "list-back-btn";
  backToHomeBtn.title = "Back to Home";
  backToHomeBtn.onclick = () => showHome();

  // Wrap in div to avoid full width stretching if we want it left aligned
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "flex-start";
  wrapper.style.width = "100%";

  wrapper.appendChild(backToHomeBtn);
  headerLi.appendChild(wrapper);

  surahListEl.appendChild(headerLi);

  sadayeSiamList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    // li.classList.add("sadaye-item"); 
    li.onclick = () => openPDF(item.pdf);
    surahListEl.appendChild(li);
  });
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

        // Enhance quality
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
 * BACK BUTTON LOGIC
 **************************************/
backBtn.onclick = () => {
  if (currentView === "viewer") {
    // Go back to the specific list we came from, or Home
    if (lastListView === "home") {
      showHome();
    } else if (lastListView === "list-amma") {
      showList("amma");
    } else if (lastListView === "list-sadaye") {
      showList("sadaye");
    }
  } else {
    // Default fallback
    showHome();
  }
};


// Initial Load
showHome();

// Browser Back Button handling
window.onpopstate = function () {
  // If we want to handle browser back button to navigate within app:
  if (currentView === "viewer") {
    backBtn.click();
  } else if (currentView.startsWith("list-")) {
    showHome();
  }
};

