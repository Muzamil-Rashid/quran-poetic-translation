const surahList = document.getElementById("surahList");
const pdfViewer = document.getElementById("pdfViewer");
const mainContainer = document.getElementById("mainContainer");
const backBtn = document.getElementById("backBtn");

fetch("data/surahs.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.name;

      // Highlight About Adfar
      if (item.type === "about") {
        li.classList.add("about");
      }

      li.addEventListener("click", () => {
        // If PDF not yet available
        if (!item.driveId) {
          alert("PDF will be available soon.");
          return;
        }

        const pdfUrl = `https://drive.google.com/file/d/${item.driveId}/preview`;
  window.location.href = pdfUrl;
      });

      surahList.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error loading surahs.json", err);
  });

// Back to Surah List
backBtn.addEventListener("click", () => {
  pdfViewer.src = ""; // stop PDF loading
  mainContainer.classList.remove("reading-mode");
  mainContainer.classList.add("home-mode");
});
