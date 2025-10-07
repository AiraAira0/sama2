// نضيف تأثير حركة بسيطة للـbubbles عشوائي
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
  let direction = 1;
  setInterval(() => {
    bubble.style.transform = `translateY(${direction * 3}px)`;
    direction *= -1;
  }, 1000 + Math.random()*500); // حركة عشوائية خفيفة
});

function goToNextPage() {
  window.location.href = "../nav/games.html"; // غير الاسم حسب الصفحة اللي عندك
}