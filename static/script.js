document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const songList = document.getElementById("song-list");
  const audioPlayer = document.getElementById("audio-player");
  const pdfViewer = document.getElementById("pdf-viewer"); // Assuming you have an iframe with this ID

  // Fetch and display songs
  // Fetch and display songs on page load
  fetchSongs();

  // Search functionality
  searchBar.addEventListener("input", function () {
    filterSongs(searchBar.value.toLowerCase());
  });

  function fetchSongs() {
    fetch("https://api.github.com/repos/ai-fanatic/DivineRadio/contents/Audio")
      .then((response) => response.json())
      .then((data) => {
        const mp3Files = data.filter((file) => file.name.endsWith(".mp3"));
        displaySongs(mp3Files);
      })
      .catch((error) => console.error("Error:", error));
  }

  function displaySongs(songs) {
    songList.innerHTML = "";
    songs.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.textContent = formatSongName(song.name);
      songDiv.onclick = () => {
        playSong(song.download_url);
        // Construct the correct PDF URL
        const pdfUrl = `https://raw.githubusercontent.com/ai-fanatic/DivineRadio/main/PDF/${song.name.replace(
          ".mp3",
          ".pdf"
        )}`;
        showPDF(pdfUrl);
      };
      songList.appendChild(songDiv);
      //console.log("songList:", songList);
    });
  }

  function formatSongName(songName) {
    let formattedName = songName.replace(".mp3", "");
    const dashIndex = formattedName.indexOf("-");
    if (dashIndex !== -1) {
      formattedName = formattedName.substring(dashIndex + 1).trim();
    }
    return formattedName;
  }

  function showPDF(pdfUrl) {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    pdfViewer.src = viewerUrl;
    pdfViewer.style.display = "block";
  }

  function playSong(url) {
    audioPlayer.src = url;
    audioPlayer.load();
    audioPlayer.oncanplaythrough = function () {
      audioPlayer.play();
    };
  }

  // Search functionality
  function filterSongs(searchTerm) {
    const songs = document.querySelectorAll("#song-list div");
    songs.forEach((songDiv) => {
      const songName = songDiv.textContent.toLowerCase();
      songDiv.style.display = songName.includes(searchTerm) ? "" : "none";
    });
  }
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
