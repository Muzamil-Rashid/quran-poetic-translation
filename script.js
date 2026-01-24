const surahListEl = document.getElementById("surahList");
const pdfViewer = document.getElementById("pdfViewer");
const placeholder = document.getElementById("placeholder");

fetch("data/surahs.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(surah => {
      const li = document.createElement("li");
      li.textContent = surah.name;

      li.addEventListener("click", () => {
        if (!surah.driveId) {
          pdfViewer.style.display = "none";
          placeholder.style.display = "flex";
          placeholder.innerHTML = "<p>PDF will be available soon.</p>";
          return;
        }

        const driveUrl = `https://drive.google.com/file/d/${surah.driveId}/preview`;
        pdfViewer.src = driveUrl;
        pdfViewer.style.display = "block";
        placeholder.style.display = "none";
      });

      surahListEl.appendChild(li);
    });
  })
  .catch(() => {
    placeholder.innerHTML = "<p>Unable to load Surah list.</p>";
  });
