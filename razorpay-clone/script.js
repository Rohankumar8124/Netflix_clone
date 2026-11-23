// Razorpay clone - interactions

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Animated stat counters
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);
counters.forEach((el) => counterObserver.observe(el));

// Testimonial slider
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('sliderDots');
let current = 0;
let timer;

function showSlide(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
  dotsWrap.querySelectorAll('button').forEach((d, idx) => {
    d.classList.toggle('active', idx === current);
    d.setAttribute('aria-current', idx === current ? 'true' : 'false');
  });
}

function nextSlide() {
  showSlide(current + 1);
}

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
  dot.addEventListener('click', () => {
    showSlide(i);
    restartAuto();
  });
  dotsWrap.appendChild(dot);
});

function restartAuto() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
}

showSlide(0);
restartAuto();

// Demo checkout modal
const demoModal = document.getElementById('demoModal');
const demoBtn = document.getElementById('demoBtn');
const modalClose = document.getElementById('modalClose');

function openModal() {
  demoModal.classList.add('open');
  demoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  demoModal.classList.remove('open');
  demoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

demoBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
demoModal.addEventListener('click', (e) => {
  if (e.target === demoModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && demoModal.classList.contains('open')) closeModal();
});

// Friendly note on the placeholder CTA
document.getElementById('ctaSignup').addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});
