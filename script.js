* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

body {
  background: #f6f6f6;
  color: #222;
}

header {
  background: #0f5132;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 1.7rem;
}

header p {
  margin-top: 5px;
  font-size: 0.95rem;
}

main {
  min-height: calc(100vh - 140px);
  transition: all 0.3s ease;
}

/* ================= HOME MODE ================= */

.home-mode .surah-section {
  max-width: 500px;
  margin: 40px auto;
}

.home-mode .viewer-section {
  display: none;
}

/* ================= SURAH LIST ================= */

.surah-section ul {
  list-style: none;
}

.surah-section li {
  font-weight: bold;
  padding: 14px;
  margin-bottom: 10px;
  background: #1abb4a;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid #ddd;
}

.surah-section li:hover {
  background: #77b1e8;
  color: white;
}

/* ============== ABOUT ADFAR (SPECIAL) ============== */

.surah-section li.about {
  background: #fff7d6;
  border: 2px solid #c9a227;
  font-weight: 600;
}

.surah-section li.about:hover {
  background: #c9a227;
  color: #000;
}

/* ================= READING MODE ================= */

.reading-mode {
  display: flex;
  height: 100%;
}

.reading-mode .surah-section {
  width: 30%;
  padding: 15px;
  border-right: 1px solid #ddd;
  max-width: none;
  margin: 0;
  overflow-y: auto;
}

.reading-mode .viewer-section {
  width: 70%;
  display: block;
  position: relative;
  background: #000;
}

/* ================= PDF VIEWER (EMBED) ================= */

#pdfViewer {
  display: block;               /* important for embed */
  width: 100%;
  height: calc(100vh - 180px);
  border: none;
  background: #000;
}

/* ================= BACK BUTTON ================= */

#backBtn {
  margin: 10px;
  padding: 8px 14px;
  border: none;
  background: #0f5132;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

#backBtn:hover {
  background: #083d24;
}

/* ================= FOOTER ================= */

footer {
  text-align: center;
  padding: 10px;
  background: #e1e1e1;
  font-size: 0.85rem;
}

/* ================= MOBILE SUPPORT ================= */

@media (max-width: 768px) {
  .reading-mode {
    flex-direction: column;
  }

  .reading-mode .surah-section {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .reading-mode .viewer-section {
    width: 100%;
  }

  #pdfViewer {
    height: calc(100vh - 240px);
  }
}
