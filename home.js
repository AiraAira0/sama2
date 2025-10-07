const downloadBtn = document.getElementById("download-btn");
const progressContainer = document.getElementById("progress-container");
const progress = document.querySelector(".progress");
const loadingText = document.getElementById("loading-text");

downloadBtn.addEventListener("click", () => {
  downloadBtn.classList.add("hidden");
  progressContainer.classList.remove("hidden");

  let width = 0;
  const interval = setInterval(() => {
    width += 10;
    progress.style.width = width + "%";

    if (width === 100) {
      clearInterval(interval);
      loadingText.textContent = "Complete! Redirecting...";
      setTimeout(() => {
        window.location.href = "nav/about.html"; // الصفحة الثانية
      }, 1500);
    }
  }, 400);
});