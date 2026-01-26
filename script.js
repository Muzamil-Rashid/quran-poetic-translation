/**************************************
 * ALL SURAHS LIST (FULL QURAN)
 **************************************/
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

/**************************************
 * RENDER SURAH LIST
 **************************************/
const surahList = document.getElementById("surahList");

surahs.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item.name;

  // Highlight About
  if (item.type === "about") {
    li.classList.add("about");
  }

  li.addEventListener("click", () => {
    if (!item.pdf) {
      alert("PDF will be available soon");
      return;
    }

    // 🔥 DIRECT FULL PAGE PDF (NO PREVIEW, NO IFRAME)
    window.location.href = item.pdf;
  });

  surahList.appendChild(li);
});
