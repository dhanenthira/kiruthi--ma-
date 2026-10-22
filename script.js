/* ==========================================================
   Forever Yours ❤️ — A Birthday Surprise  |  script.js
   ========================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------
     ✏️ EDIT ME: your letter and your reasons
     ------------------------------------------------------ */
  const LETTER_TEXT =
    "Happy Birthday, my love! ❤️\n" +
    "You are one of the most beautiful parts of my life. Your smile makes my days brighter, and your presence makes every moment special. I wish you endless happiness, success, and love. No matter where life takes us, you will always have a special place in my heart. Today is your day, and I hope it is as beautiful as you are. I love you so much! ❤️";

  // Add more lines here (up to 100 or beyond) — each is shown once before any repeat.
  const REASONS = [
    "Your smile lights up my whole world.",
    "You make ordinary days feel magical.",
    "Your laugh is my favorite sound.",
    "You are kind to everyone you meet.",
    "You believe in me even when I doubt myself.",
    "Your eyes feel like home.",
    "You make me want to be a better person.",
    "Every moment with you is a gift.",
    "You are beautiful inside and out.",
    "You listen with your whole heart.",
    "Your hugs fix everything.",
    "You make me laugh when I need it most.",
    "You are my calm in every storm.",
    "You love so deeply and so sincerely.",
    "Your voice makes my heart skip a beat.",
    "You turn small moments into memories.",
    "You are my best friend and my love.",
    "Your strength inspires me every day.",
    "You make the world feel softer.",
    "With you, I feel completely at home.",
    "Your little habits are my favorite things.",
    "You make the future look beautiful.",
    "You are simply you, and that is perfect.",
    "Every day, I fall for you again.",
    "You are my favorite hello and hardest goodbye.",
    "Your dreams matter to me as much as mine.",
    "You make even silence feel full of love.",
    "I am luckiest when I am with you.",
    "You are my wish that came true.",
    "Because you are you, my love."
  ];

  /* ------------------------------------------------------
     Helpers
     ------------------------------------------------------ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (a, b) => Math.random() * (b - a) + a;

  /* ------------------------------------------------------
     Background: floating hearts, rose petals, stars (CSS-animated)
     ------------------------------------------------------ */
  function buildBackground() {
    const layer = $("#bg-layer");
    const small = window.innerWidth < 600;
    const hearts = small ? 10 : 18;
    const petals = small ? 10 : 18;
    const stars = small ? 30 : 60;
    const frag = document.createDocumentFragment();

    const glyphs = ["🤍", "🤍", "✨", "🤍", "⭐"];
    for (let i = 0; i < hearts; i++) {
      const h = document.createElement("span");
      h.className = "bg-heart";
      h.textContent = glyphs[i % glyphs.length];
      h.style.left = rand(0, 100) + "%";
      h.style.fontSize = rand(12, 30) + "px";
      h.style.animationDuration = rand(9, 18) + "s";
      h.style.animationDelay = -rand(0, 18) + "s";
      frag.appendChild(h);
    }
    for (let i = 0; i < petals; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = rand(0, 100) + "%";
      p.style.animationDuration = rand(9, 17) + "s";
      p.style.animationDelay = -rand(0, 17) + "s";
      p.style.transform = "scale(" + rand(0.6, 1.2) + ")";
      frag.appendChild(p);
    }
    for (let i = 0; i < stars; i++) {
      const s = document.createElement("span");
      s.className = "star";
      s.style.left = rand(0, 100) + "%";
      s.style.top = rand(0, 100) + "%";
      s.style.animationDuration = rand(2, 5) + "s";
      s.style.animationDelay = -rand(0, 5) + "s";
      frag.appendChild(s);
    }
    layer.appendChild(frag);
  }

  /* ------------------------------------------------------
     Canvas effects: confetti + fireworks
     ------------------------------------------------------ */
  const canvas = $("#fx");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, running = false;
  const particles = [];
  const COLORS = ["#38bdf8", "#0ea5e9", "#7dd3fc", "#bae6fd", "#3b82f6", "#60a5fa", "#ffffff", "#67e8f9", "#93c5fd"];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function confetti(count) {
    if (reduceMotion) return;
    count = count || 160;
    for (let i = 0; i < count; i++) {
      particles.push({
        type: "confetti",
        x: rand(0, W), y: rand(-H * 0.3, -10),
        vx: rand(-1.5, 1.5), vy: rand(2, 5),
        size: rand(6, 11), rot: rand(0, 6.28), vr: rand(-0.2, 0.2),
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1, decay: rand(0.002, 0.004)
      });
    }
    start();
  }

  function firework(x, y) {
    if (reduceMotion) return;
    const color = COLORS[(Math.random() * COLORS.length) | 0];
    const n = 46;
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n;
      const sp = rand(1.5, 5);
      particles.push({
        type: "spark", x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        size: rand(1.6, 3), color, life: 1, decay: rand(0.012, 0.022)
      });
    }
    start();
  }

  function start() {
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.type === "confetti") {
        p.rot += p.vr; p.vx += Math.sin(p.y * 0.02) * 0.02;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      } else {
        p.vy += 0.045; p.vx *= 0.985;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (p.life <= 0 || p.y > H + 30) particles.splice(i, 1);
    }
    ctx.globalAlpha = 1;
    if (particles.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  function fireworkShow(bursts) {
    for (let i = 0; i < bursts; i++) {
      setTimeout(() => firework(rand(W * 0.15, W * 0.85), rand(H * 0.15, H * 0.5)), i * 450);
    }
  }

  /* ------------------------------------------------------
     Section 1: Welcome -> unlock and scroll to the cake
     ------------------------------------------------------ */
  $("#openBtn").addEventListener("click", () => {
    document.body.classList.remove("locked");
    confetti(80);
    playMusic();
    // wait a frame so the sections are rendered before scrolling
    requestAnimationFrame(() => {
      $("#cake").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ------------------------------------------------------
     Section 2: Cake wish
     ------------------------------------------------------ */
  const wishBtn = $("#wishBtn");
  wishBtn.addEventListener("click", () => {
    $(".cake").classList.add("out");
    wishBtn.disabled = true;
    wishBtn.textContent = "Wish Made ✨";
    $("#wishMsg").classList.add("show");
    confetti(240);
    setTimeout(() => confetti(120), 900);
  });

  /* ------------------------------------------------------
     Section 3: Gallery — operations, lightbox & mobile logic
     ------------------------------------------------------ */
  const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#ffc2da'/><stop offset='1' stop-color='#b388ff'/></linearGradient></defs>" +
      "<rect width='200' height='200' fill='url(#g)'/>" +
      "<text x='100' y='118' font-size='70' text-anchor='middle'>❤️</text>" +
      "<text x='100' y='170' font-size='13' text-anchor='middle' fill='#4a1d4f' font-family='sans-serif'>Add your photo here</text></svg>"
    );

  const polaroids = $$(".polaroid");
  const modal = $("#memoryModal");
  const modalImg = $("#modalImg");
  const modalCaption = $("#modalCaption");
  const modalCounter = $("#modalCounter");
  const modalClose = $("#modalClose");
  const modalBackdrop = $("#modalBackdrop");
  const modalPrev = $("#modalPrev");
  const modalNext = $("#modalNext");
  const modalHeart = $("#modalHeart");

  let currentIndex = 0;
  const photoData = polaroids.map((p, idx) => {
    const img = p.querySelector("img");
    const cap = p.querySelector("figcaption");
    return {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || ("Memory " + (idx + 1)),
      caption: cap ? cap.textContent : ("Memory " + (idx + 1)),
      liked: false
    };
  });

  // Handle broken/missing images fallback
  $$(".polaroid img").forEach((img) => {
    const useFallback = () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = "1";
      img.src = PLACEHOLDER;
    };
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  });

  function updateModalPhoto(idx, animate = true) {
    if (idx < 0) idx = photoData.length - 1;
    if (idx >= photoData.length) idx = 0;
    currentIndex = idx;

    const data = photoData[currentIndex];
    if (animate) {
      modalImg.style.opacity = "0";
      modalImg.style.transform = "scale(0.96)";
      setTimeout(() => {
        modalImg.src = data.src;
        modalImg.alt = data.alt;
        modalCaption.textContent = data.caption;
        modalCounter.textContent = (currentIndex + 1) + " / " + photoData.length;
        modalImg.style.opacity = "1";
        modalImg.style.transform = "scale(1)";
      }, 150);
    } else {
      modalImg.src = data.src;
      modalImg.alt = data.alt;
      modalCaption.textContent = data.caption;
      modalCounter.textContent = (currentIndex + 1) + " / " + photoData.length;
    }

    if (data.liked) {
      modalHeart.classList.add("liked");
      modalHeart.textContent = "Loved 🤍";
    } else {
      modalHeart.classList.remove("liked");
      modalHeart.textContent = "🤍 Love this";
    }
  }

  function openModal(idx) {
    updateModalPhoto(idx, false);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    confetti(50);
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Open on polaroid click or Enter key
  polaroids.forEach((card, idx) => {
    card.addEventListener("click", () => openModal(idx));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(idx);
      }
    });
  });

  // Modal navigation controls
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModalPhoto(currentIndex - 1);
  });
  modalNext.addEventListener("click", (e) => {
    e.stopPropagation();
    updateModalPhoto(currentIndex + 1);
  });

  // Like reaction button
  modalHeart.addEventListener("click", (e) => {
    e.stopPropagation();
    const data = photoData[currentIndex];
    data.liked = !data.liked;
    if (data.liked) {
      modalHeart.classList.add("liked");
      modalHeart.textContent = "Loved 🤍";
      confetti(120);
      const rect = modalHeart.getBoundingClientRect();
      firework(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      modalHeart.classList.remove("liked");
      modalHeart.textContent = "🤍 Love this";
    }
  });

  // Keyboard navigation for modal
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") updateModalPhoto(currentIndex - 1);
    else if (e.key === "ArrowRight") updateModalPhoto(currentIndex + 1);
  });

  // Touch Swipe gestures for mobile devices
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  modal.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    if (e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }
  }, { passive: true });

  function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    // Horizontal swipe threshold: 45px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
      if (dx < 0) {
        updateModalPhoto(currentIndex + 1); // Swipe left -> Next
      } else {
        updateModalPhoto(currentIndex - 1); // Swipe right -> Prev
      }
    } else if (dy > 80 && Math.abs(dx) < 60) {
      // Swipe down -> Close modal
      closeModal();
    }
  }

  /* ------------------------------------------------------
     Section 4: Envelope + typewriter letter
     ------------------------------------------------------ */
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  const letterText = $("#letterText");
  let letterStarted = false;

  function typeLetter() {
    if (reduceMotion) { letterText.textContent = LETTER_TEXT; return; }
    let i = 0;
    letterText.classList.add("typing");
    (function tick() {
      letterText.textContent = LETTER_TEXT.slice(0, ++i);
      if (i < LETTER_TEXT.length) {
        const ch = LETTER_TEXT[i - 1];
        setTimeout(tick, ch === "." || ch === "!" || ch === "\n" ? 260 : 32);
      } else {
        letterText.classList.remove("typing");
      }
    })();
  }

  envelope.addEventListener("click", () => {
    if (letterStarted) return;
    letterStarted = true;
    envelope.classList.add("open");
    envelope.setAttribute("aria-expanded", "true");
    envelope.setAttribute("aria-label", "Love letter opened");
    $("#envHint").textContent = "";
    setTimeout(() => {
      paper.classList.add("show");
      typeLetter();
    }, reduceMotion ? 0 : 700);
  });

  /* ------------------------------------------------------
     Section 5: Reasons (shuffle bag: no repeats until all shown)
     ------------------------------------------------------ */
  let bag = [];
  let shown = 0;

  function refillBag() {
    bag = REASONS.slice();
    for (let i = bag.length - 1; i > 0; i--) {          // Fisher–Yates shuffle
      const j = (Math.random() * (i + 1)) | 0;
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }

  $("#reasonBtn").addEventListener("click", () => {
    if (!bag.length) { refillBag(); shown = 0; }
    const text = bag.pop();
    shown++;
    const el = $("#reasonText");
    el.classList.remove("pop");
    void el.offsetWidth;                                 // restart the animation
    el.textContent = text;
    el.classList.add("pop");
    $("#reasonCount").textContent =
      shown + " of " + REASONS.length + " reasons revealed" + (bag.length ? "" : " ❤️ — tap again to start over");
  });

  /* ------------------------------------------------------
     Section 6: Background Music Player & Auto-playback
     ------------------------------------------------------ */
  const audio = $("#audio");
  const playBtn = $("#playBtn");
  const muteBtn = $("#muteBtn");
  const musicMsg = $("#musicMsg");
  const disc = $("#disc");
  const floatingMusicBtn = $("#floatingMusicBtn");
  let audioMissing = false;

  function syncMusicUI(isPlaying) {
    if (isPlaying) {
      playBtn.textContent = "⏸";
      playBtn.setAttribute("aria-label", "Pause music");
      disc.classList.add("spin");
      musicMsg.textContent = "Playing in background 🎶";
      if (floatingMusicBtn) {
        floatingMusicBtn.classList.add("playing");
        floatingMusicBtn.setAttribute("aria-label", "Pause background music");
        floatingMusicBtn.setAttribute("title", "Background Music: Playing 🎶");
      }
    } else {
      playBtn.textContent = "▶";
      playBtn.setAttribute("aria-label", "Play music");
      disc.classList.remove("spin");
      musicMsg.textContent = "Paused";
      if (floatingMusicBtn) {
        floatingMusicBtn.classList.remove("playing");
        floatingMusicBtn.setAttribute("aria-label", "Play background music");
        floatingMusicBtn.setAttribute("title", "Background Music: Paused");
      }
    }
  }

  function showMissing() {
    audioMissing = true;
    syncMusicUI(false);
    musicMsg.textContent = "💿 Add your song to the song/ folder to hear music here.";
  }

  audio.addEventListener("error", showMissing);

  function playMusic() {
    if (audioMissing) return;
    if (audio.paused) {
      audio.play().then(() => {
        syncMusicUI(true);
      }).catch(() => {
        // Autoplay may be restricted until first user interaction
      });
    }
  }

  function pauseMusic() {
    audio.pause();
    syncMusicUI(false);
  }

  function toggleMusic() {
    if (audioMissing) { showMissing(); return; }
    if (audio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  playBtn.addEventListener("click", toggleMusic);
  if (floatingMusicBtn) {
    floatingMusicBtn.addEventListener("click", toggleMusic);
  }

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    muteBtn.setAttribute("aria-pressed", String(audio.muted));
    muteBtn.setAttribute("aria-label", audio.muted ? "Unmute music" : "Mute music");
  });

  // Attempt to autoplay on initial open
  playMusic();

  // If browser requires user interaction first, start on the very first touch/click anywhere
  function autoStartOnInteraction() {
    playMusic();
    window.removeEventListener("pointerdown", autoStartOnInteraction);
    window.removeEventListener("keydown", autoStartOnInteraction);
  }
  window.addEventListener("pointerdown", autoStartOnInteraction, { passive: true });
  window.addEventListener("keydown", autoStartOnInteraction, { passive: true });

  /* ------------------------------------------------------
     Section 7: Infinity of hearts + finale
     ------------------------------------------------------ */
  function buildInfinity() {
    const box = $("#infinity");
    const N = 48;
    for (let i = 0; i < N; i++) {
      const t = (Math.PI * 2 * i) / N;
      const d = 1 + Math.sin(t) * Math.sin(t);
      const x = Math.cos(t) / d;                        // lemniscate of Bernoulli
      const y = (Math.sin(t) * Math.cos(t)) / d;
      const s = document.createElement("span");
      s.textContent = "🤍";
      s.style.left = 50 + x * 45 + "%";
      s.style.top = 50 + y * 90 + "%";
      s.style.animationDelay = (i / N) * 1.8 + "s";
      box.appendChild(s);
    }
  }

  $("#finalBtn").addEventListener("click", () => {
    $("#finalMsg").classList.add("show");
    fireworkShow(7);
    confetti(260);
    $("#finalBtn").textContent = "Forever 🤍";
  });

  // Fireworks when the finale scrolls into view
  let finaleSeen = false;
  const finaleObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !finaleSeen) {
        finaleSeen = true;
        fireworkShow(4);
        confetti(100);
      }
    });
  }, { threshold: 0.6 });

  /* ------------------------------------------------------
     Navigation dots: highlight the section in view
     ------------------------------------------------------ */
  function setupNav() {
    const links = $$("#dots a");
    const sections = $$("main > section");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        }
      });
    }, { threshold: 0.55 });
    sections.forEach((s) => obs.observe(s));
  }

  /* ------------------------------------------------------
     Init
     ------------------------------------------------------ */
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  buildBackground();
  buildInfinity();
  setupNav();
  finaleObs.observe($("#finale"));
})();
