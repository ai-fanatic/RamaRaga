document.getElementById("youtubeVideo").addEventListener("click", function () {
  var pdfIframe = document.getElementById("pdfViewer");
  // pdfIframe.style.display =
  //   pdfIframe.style.display === "none" ? "block" : "none";

  const viewerUrl = `https://docs.google.com/gview?url=https://raw.githubusercontent.com/ai-fanatic/RamaRaga/main/PDF/Ramayan-YuddhaKanda_59Sarga.pdf&embedded=true`;
  pdfIframe.src = viewerUrl;
  pdfIframe.style.display = "block";
});

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const isNightMode = body.classList.toggle("night-mode");

  if (isNightMode) {
    themeIcon.textContent = "🌙";
  } else {
    themeIcon.textContent = "🌞";
  }
}
