function goBack() {
  window.location.href = 'games.html';
}

const items = document.querySelectorAll('.surprise-item');
const popup = document.getElementById('popup');
const popupIcon = document.querySelector('.popup-icon');
const popupText = document.querySelector('.popup-text');

items.forEach(item => {
  item.addEventListener('click', () => {
    popupIcon.textContent = item.dataset.icon;
    popupText.innerHTML = '';

    // تنظيف
    const existingBtn = popup.querySelector('.hug-btn');
    if (existingBtn) existingBtn.remove();

    // نص الرسالة
    if (item.dataset.text) {
      const p = document.createElement('p');
      p.textContent = item.dataset.text;
      popupText.appendChild(p);
    }

    // 🎥 فيديو خاص
    if (item.dataset.video) {
      const vid = document.createElement('video');
      vid.src = item.dataset.video;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true; // مبدئيًا صامت
      vid.volume = 1.0;
      vid.controls = false;
      vid.playsInline = true;
      vid.style.maxWidth = '85%';
      vid.style.borderRadius = '14px';
      vid.style.margin = '10px auto';
      vid.style.display = 'block';
      vid.style.boxShadow = '0 0 25px rgba(255,255,255,0.4)';
      popupText.appendChild(vid);

      // ✨ تشغيل ناعم
      vid.animate([
        { transform: 'scale(0.9)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 500, easing: 'ease-out' });

      // 🔊 تفعيل الصوت لاحقاً
      setTimeout(() => {
        vid.muted = false;
        vid.play().catch(() => {
          console.warn("المتصفح منع الصوت التلقائي 😒");
        });
      }, 300);
    }

    popup.style.display = 'flex';

    // 🫂 زر الأحضان
    if (item.dataset.hug === "true") {
      const hugBtn = document.createElement('button');
      hugBtn.textContent = 'Send Big Hug! 🫂';
      hugBtn.className = 'hug-btn';
      hugBtn.style.marginTop = '10px';
      hugBtn.style.padding = '10px';
      hugBtn.style.fontSize = '16px';

      hugBtn.onclick = () => {
        for (let i = 0; i < 30; i++) {
          const hug = document.createElement('div');
          hug.textContent = '🫂';
          hug.style.position = 'fixed';
          hug.style.left = Math.random() * window.innerWidth + 'px';
          hug.style.top = Math.random() * window.innerHeight + 'px';
          hug.style.fontSize = (20 + Math.random() * 40) + 'px';
          hug.style.zIndex = '9999';
          hug.style.pointerEvents = 'none';
          hug.style.opacity = 0.8;
          document.body.appendChild(hug);

          const duration = 3000 + Math.random() * 2000;
          hug.animate([
            { transform: `translateY(0px) rotate(0deg)`, opacity: 0.8 },
            { transform: `translateY(-100px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
          ], { duration: duration });

          setTimeout(() => hug.remove(), duration);
        }
      };

      popup.querySelector('.popup-content').appendChild(hugBtn);
    }
  });
});

// ✖️ إغلاق عند الضغط خارج البوب أب + إيقاف الفيديو
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
    
    // إزالة زر الأحضان لو موجود
    const existingBtn = popup.querySelector('.hug-btn');
    if (existingBtn) existingBtn.remove();
    
    // 🔇 إيقاف أي فيديو أو صوت داخل البوب أب
    const vids = popup.querySelectorAll('video, audio');
    vids.forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
  }
});