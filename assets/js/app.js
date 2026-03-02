/* =============================================
   MAZEN TALSAM — Portfolio JS
   ============================================= */

// =============================================
// INTRO SCREEN — SPLIT CURTAIN EXIT
// =============================================
const introScreen = document.getElementById('intro-screen');

function launchSite() {
  document.body.classList.add('loaded');
  attachObservers();
  animateCounters();
}

if (introScreen) {
  const introContent = introScreen.querySelector('.intro-content');

  // Step 1: After 2.1s, fade out the center content
  setTimeout(() => {
    if (introContent) introContent.classList.add('hide');

    // Step 2: After content fades (0.25s), split the curtains apart
    setTimeout(() => {
      introScreen.classList.add('exiting');

      // Step 3: After curtains finish (0.65s), launch site
      setTimeout(() => {
        introScreen.style.display = 'none';
        launchSite();
      }, 680);
    }, 260);
  }, 2100);
} else {
  launchSite();
}

// =============================================
// SCROLL REVEAL — titles + staggered cards
// =============================================
function attachObservers() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger any .reveal-card children
        const cards = entry.target.querySelectorAll('.reveal-card');
        cards.forEach((card, idx) => {
          setTimeout(() => card.classList.add('visible'), idx * 90);
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1200;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let count = 0;

  const timer = setInterval(() => {
    count++;
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current) + '+';
    if (count >= steps) clearInterval(timer);
  }, duration / steps);
}

function animateCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
}

// =============================================
// ACTIVE NAV HIGHLIGHT ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navBtns  = document.querySelectorAll('.nav-btn');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

// =============================================
// PROFILE CARD 3D TILT
// =============================================
const cardEl = document.querySelector('.profile-card');

if (cardEl) {
  cardEl.addEventListener('mousemove', (e) => {
    const rect   = cardEl.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    cardEl.style.transition = 'transform 0.08s ease';
    cardEl.style.transform  = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateY(-4px) scale(1.01)`;
  });

  cardEl.addEventListener('mouseleave', () => {
    cardEl.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    cardEl.style.transform  = '';
  });
}

// =============================================
// CUSTOM CURSOR
// =============================================
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Ring follows with lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring over interactive elements
document.querySelectorAll('a, button, .project-row, .service-card, .exp-card, .skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '48px';
    cursorRing.style.height = '48px';
    cursorRing.style.borderColor = 'rgba(255,107,0,0.65)';
    cursorDot.style.width  = '4px';
    cursorDot.style.height = '4px';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.borderColor = 'rgba(255,107,0,0.35)';
    cursorDot.style.width  = '8px';
    cursorDot.style.height = '8px';
  });
});

// =============================================
// MODAL CONTROL
// =============================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'flex';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'none';
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  }
});

// =============================================
// CONTACT FORM — Google Sheets
// =============================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbzkd5ZIfMet4un8droq8cTfpTK_DyZvkKqTy8mKu-G6VhrPsVgX_n279xZaRPSP5Egy/exec';
const form = document.forms['submit-to-google-sheet'];
const msg  = document.getElementById('msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        setTimeout(() => { msg.textContent = ''; }, 5000);
      })
      .catch(() => {
        msg.textContent = '✕ Something went wrong. Email me directly.';
      })
      .finally(() => {
        btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
        btn.disabled = false;
      });
  });
}

// =============================================
// SKILL PILL STAGGER
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill-pill').forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(8px)';
    pill.style.transition = `opacity 0.35s ease ${i * 35}ms, transform 0.35s ease ${i * 35}ms, border-color 0.25s, color 0.25s, background 0.25s`;
    setTimeout(() => {
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, 800 + i * 35);
  });
});
