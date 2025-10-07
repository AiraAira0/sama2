const attentionRange = document.getElementById('attentionRange');
const attentionText = document.getElementById('attentionText');

attentionRange.addEventListener('input', () => {
  const value = attentionRange.value;
  if(value < 30) {
    attentionText.textContent = "🤨قلت بطعننننننن";
  } else if(value < 70) {
    attentionText.textContent = "😒ستل ماينفع زيد ";
  } else {
    attentionText.textContent = "🤏🏻😞ايوه كذا كان تسويه من البداية ";
  }
});

function goToPage(page) {
  window.location.href = page; // يروح للصفحة اللي تختارينها
}