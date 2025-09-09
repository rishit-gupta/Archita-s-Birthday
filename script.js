// --- CONFIGURATION ---
const HER_NAME = 'Archita'; // Change this to her name
const PHOTOS = [
  'images/1000113029.png'
];
const LOVE_QUOTES = [
  'You are my sun, my moon, and all my stars. – E.E. Cummings',
  'Every moment with you is a treasure.',
  'I love you more than words can say.',
  'With you, every day is magical.',
  'You are the dream I never want to wake up from.'
];
const SURPRISE_DATE = new Date('2025-09-10T00:00:00+05:30'); // Set your event date/time

// --- LANDING PAGE LOGIC ---
document.getElementById('her-name').textContent = HER_NAME;
const enterBtn = document.getElementById('enter-btn');
enterBtn.addEventListener('click', () => {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('message-section').classList.remove('hidden');
  document.getElementById('love-section').classList.remove('hidden');
  playMusic();
});

// --- BACKGROUND MUSIC ---
function playMusic() {
  const audio = document.getElementById('bg-music');
  if (audio.paused) audio.play();
}

// --- LOVE SECTION CAROUSEL ---
const CAROUSEL_IMAGES = [
  'p1.jpg',
  '1000113027.jpg',
  '1000113031.jpg',
  '1000113033.jpg',
  '1000113035.jpg'
];
let carouselIdx = 0;
const carouselImg = document.getElementById('carousel-img');
const prevImgBtn = document.getElementById('prev-img');
const nextImgBtn = document.getElementById('next-img');
prevImgBtn.onclick = function() {
  carouselIdx = (carouselIdx - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
  carouselImg.src = CAROUSEL_IMAGES[carouselIdx];
};
nextImgBtn.onclick = function() {
  carouselIdx = (carouselIdx + 1) % CAROUSEL_IMAGES.length;
  carouselImg.src = CAROUSEL_IMAGES[carouselIdx];
};

// --- RAINING HEARTS ANIMATION ---
document.addEventListener('DOMContentLoaded', function() {
  function createHeartDrop() {
    const heart = document.createElement('div');
    heart.className = 'heart-drop';
    const color = Math.random() > 0.5 ? '#ff5eaa' : '#ffb6c1';
    heart.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 29s-13-8.14-13-16A7 7 0 0 1 16 6a7 7 0 0 1 13 7c0 7.86-13 16-13 16z" fill="${color}"/></svg>`;
    heart.style.left = Math.random() * 98 + 'vw';
    heart.style.top = '-40px';
    document.getElementById('raining-hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }
  setInterval(createHeartDrop, 350);

  // --- FIREWORKS ANIMATION ---
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const colors = ['#ff5eaa', '#ffb6c1', '#f9d423', '#a0b8f8', '#b68be6', '#ff6347', '#00e6e6'];
  let fireworks = [];
  let particles = [];

  function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = 100 + Math.random() * (canvas.height * 0.5);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.radius = 2 + Math.random() * 2;
    this.speed = 6 + Math.random() * 3;
    this.alive = true;
  }
  Firework.prototype.update = function() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.alive = false;
      explode(this.x, this.y, this.color);
    }
  };
  Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  function explode(x, y, color) {
    for (let i = 0; i < 24; i++) {
      particles.push({
        x,
        y,
        angle: (i / 24) * 2 * Math.PI,
        speed: 2 + Math.random() * 3,
        radius: 1.5 + Math.random() * 1.5,
        alpha: 1,
        color
      });
    }
  }

  function updateParticles() {
    for (let p of particles) {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.speed *= 0.96;
      p.alpha -= 0.012;
    }
    particles = particles.filter(p => p.alpha > 0);
  }

  function drawParticles() {
    for (let p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.04) fireworks.push(new Firework());
    for (let fw of fireworks) fw.update();
    fireworks = fireworks.filter(fw => fw.alive);
    for (let fw of fireworks) fw.draw();
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();
});

// --- 3D HEART (Three.js) ---
(function create3DHeart() {
  const container = document.getElementById('heart-3d-container');
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
  camera.position.z = 4;
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  // Heart shape
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x, y, x - 0.25, y + 0.25);
  heartShape.bezierCurveTo(x - 0.55, y + 0.55, x - 0.4, y + 1.1, x + 0.25, y + 1.35);
  heartShape.bezierCurveTo(x + 0.9, y + 1.1, x + 0.75, y + 0.55, x + 0.45, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
  const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  const material = new THREE.MeshPhongMaterial({ color: 0xffb6c1, shininess: 80, specular: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffe1fa, 1);
  dirLight.position.set(2, 2, 5);
  scene.add(dirLight);
  // Animate
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    mesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    renderer.render(scene, camera);
  }
  animate();
})();

// --- SPARKLES (Lottie) ---
(function sparklesLottie() {
  lottie.loadAnimation({
    container: document.getElementById('sparkles-lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets4.lottiefiles.com/packages/lf20_0yfsb3a1.json' // Sparkle animation
  });
})();

// --- CAROUSEL LOGIC ---
let photoIdx = 0;
const photoEl = document.getElementById('carousel-photo');
const prevBtn = document.getElementById('prev-photo');
const nextBtn = document.getElementById('next-photo');
if (PHOTOS.length === 1) {
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
}
prevBtn.onclick = function() {
  photoIdx = (photoIdx - 1 + PHOTOS.length) % PHOTOS.length;
  photoEl.src = PHOTOS[photoIdx];
};
nextBtn.onclick = function() {
  photoIdx = (photoIdx + 1) % PHOTOS.length;
  photoEl.src = PHOTOS[photoIdx];
};

// --- LOVE QUOTES ANIMATION ---
let quoteIdx = 0;
const quoteEl = document.getElementById('love-quote');
function showNextQuote() {
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = LOVE_QUOTES[quoteIdx];
    quoteEl.style.opacity = 1;
    quoteIdx = (quoteIdx + 1) % LOVE_QUOTES.length;
  }, 700);
}
showNextQuote();
setInterval(showNextQuote, 4000);

// --- COUNTDOWN TIMER ---
function updateCountdown() {
  const now = new Date();
  let diff = SURPRISE_DATE - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  document.getElementById('countdown').textContent = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// --- FLOATING ELEMENTS (balloons, hearts, stars, butterflies) ---
(function createFloatingElements() {
  const container = document.getElementById('floating-elements');
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  function randomBetween(a, b) { return Math.random() * (b - a) + a; }
  // Balloons
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'floating-balloon';
    el.style.left = randomBetween(5, 90) + 'vw';
    el.style.bottom = '-60px';
    el.style.background = 'linear-gradient(135deg, #f8e1f4 60%, #e0e7fa 100%)';
    container.appendChild(el);
    gsap.to(el, {
      y: -randomBetween(vh * 0.5, vh * 0.85),
      x: `+=${randomBetween(-30, 30)}`,
      duration: randomBetween(7, 16),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: randomBetween(0, 6)
    });
  }
  // Hearts
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.style.left = randomBetween(3, 97) + 'vw';
    el.style.bottom = '-40px';
    container.appendChild(el);
    gsap.to(el, {
      y: -randomBetween(vh * 0.3, vh * 0.7),
      x: `+=${randomBetween(-20, 20)}`,
      duration: randomBetween(5, 12),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: randomBetween(0, 7)
    });
  }
  // Stars
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'floating-star';
    el.style.left = randomBetween(0, 100) + 'vw';
    el.style.bottom = '-20px';
    container.appendChild(el);
    gsap.to(el, {
      y: -randomBetween(vh * 0.7, vh * 0.95),
      x: `+=${randomBetween(-10, 10)}`,
      duration: randomBetween(8, 20),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: randomBetween(0, 10)
    });
  }
  // Butterflies (animated with Lottie)
  for (let i = 0; i < 3; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'floating-butterfly';
    wrapper.style.left = randomBetween(10, 90) + 'vw';
    wrapper.style.bottom = '-30px';
    wrapper.style.zIndex = 4;
    container.appendChild(wrapper);
    lottie.loadAnimation({
      container: wrapper,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets1.lottiefiles.com/packages/lf20_2ks2r6bf.json' // Butterfly
    });
    gsap.to(wrapper, {
      y: -randomBetween(vh * 0.5, vh * 0.9),
      x: `+=${randomBetween(-60, 60)}`,
      duration: randomBetween(10, 18),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: randomBetween(0, 9)
    });
  }
})();

// --- STARRY NIGHT SKY (parallax) ---
(function createStarryBG() {
  const bg = document.getElementById('starry-bg');
  const ctx = document.createElement('canvas');
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
  ctx.style.width = '100vw';
  ctx.style.height = '100vh';
  ctx.style.position = 'absolute';
  ctx.style.top = '0';
  ctx.style.left = '0';
  bg.appendChild(ctx);
  const c = ctx.getContext('2d');
  const stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * ctx.width,
      y: Math.random() * ctx.height,
      r: Math.random() * 1.2 + 0.2,
      d: Math.random() * 0.6 + 0.2
    });
  }
  function animateStars() {
    c.clearRect(0, 0, ctx.width, ctx.height);
    for (let s of stars) {
      c.beginPath();
      c.arc(s.x, s.y, s.r, 0, 2 * Math.PI, false);
      c.fillStyle = 'rgba(255,255,255,0.8)';
      c.shadowColor = '#fff';
      c.shadowBlur = 8;
      c.fill();
      // Parallax effect
      s.x += Math.sin(Date.now() * 0.0001 + s.d) * 0.04;
      s.y += Math.cos(Date.now() * 0.00013 + s.d) * 0.03;
      if (s.x > ctx.width) s.x = 0;
      if (s.x < 0) s.x = ctx.width;
      if (s.y > ctx.height) s.y = 0;
      if (s.y < 0) s.y = ctx.height;
    }
    requestAnimationFrame(animateStars);
  }
  animateStars();
  window.addEventListener('resize', () => {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
  });
})();

// --- REVEAL LOVE LETTER & HEART EXPLOSION ---
document.getElementById('reveal-btn').onclick = function() {
  const heartExplosion = document.getElementById('heart-explosion');
  heartExplosion.style.display = 'flex';
  setTimeout(() => {
    heartExplosion.style.display = 'none';
    document.getElementById('love-letter').classList.remove('hidden');
  }, 1200);
  this.textContent = '💖';
};
