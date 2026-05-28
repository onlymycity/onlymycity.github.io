// ─── Cycling city names in hero ───────────────────────
const cities = [
  { city: 'The Bronx',    sub: 'New York' },
  { city: 'Manhattan',    sub: 'New York' },
  { city: 'Brooklyn',     sub: 'New York' },
  { city: 'Queens',       sub: 'New York' },
  { city: 'Staten Island',sub: 'New York' },
];

const heroOnly = document.getElementById('heroOnly');
const heroCity = document.getElementById('heroCity');

let cityIndex = 0;
let started = false;

function cycleCity() {
  const next = cities[cityIndex % cities.length];

  // On first cycle, transition from "Only My City" to city names
  if (!started) {
    started = true;
    // Reset heroOnly to just "Only In" before first cycle
    if (heroOnly) {
      heroOnly.style.display = 'block';
      heroCity.style.display = 'block';
    }
  }

  const fadeEls = [heroOnly, heroCity, signCity, signSub].filter(Boolean);

  // Fade out
  fadeEls.forEach(el => {
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-12px)';
  });

  setTimeout(() => {
    if (heroOnly) heroOnly.textContent = 'Only In';
    heroCity.textContent = next.city;
    // Ensure block display for two-line layout
    if (heroOnly) heroOnly.style.display = 'block';
    heroCity.style.display = 'block';

    fadeEls.forEach(el => {
      el.style.transform = 'translateY(12px)';
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fadeEls.forEach(el => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });

    cityIndex++;
  }, 350);
}

// Wait 2.5 seconds on page load before starting cycle
setTimeout(() => {
  setInterval(cycleCity, 2200);
}, 2500);


// ─── Identity sign animation ─────────────────────────
const identityPlaces = [
  { city: 'The Bronx',       sub: 'New York' },
  { city: 'Manhattan',       sub: 'New York'   },
  { city: 'Brooklyn',        sub: 'New York' },
  { city: 'Queens',          sub: 'New York'},
  { city: 'Staten Island',   sub: 'New York' },
];

const identityCity = document.getElementById('identityCity');
const identitySub  = document.getElementById('identitySub');
let identityIndex  = 0;

function cycleIdentity() {
  const fadeEls = [identityCity, identitySub].filter(Boolean);

  fadeEls.forEach(el => {
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-12px)';
  });

  setTimeout(() => {
    identityIndex = (identityIndex + 1) % identityPlaces.length;
    const next = identityPlaces[identityIndex];
    if (identityCity) identityCity.textContent = next.city;
    if (identitySub)  identitySub.textContent  = next.sub;

    fadeEls.forEach(el => {
      el.style.transition = 'none';
      el.style.transform = 'translateY(12px)';
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fadeEls.forEach(el => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }, 350);
}

// Offset from hero animation so they don't cycle at the same time
setTimeout(() => {
  setInterval(cycleIdentity, 2400);
}, 1200);

// ─── Smooth scroll for anchor links ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Nav scroll effect ────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(255,255,255,0.12)';
  } else {
    nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
  }
});

// ─── Waitlist form ────────────────────────────────────
const form = document.getElementById('waitlistForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const formSuccess = document.getElementById('formSuccess');
const successCity = document.getElementById('successCity');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      city: form.city.value.trim(),
      notes: form.notes.value.trim(),
    };

    // Update button state
    submitBtn.disabled = true;
    submitText.textContent = 'Joining...';

    // TODO: replace with real API endpoint
    // await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify(data) });

    // Simulate submission delay
    setTimeout(() => {
      form.querySelectorAll('.form-grid, .form-submit-wrap').forEach(el => {
        el.style.display = 'none';
      });
      successCity.textContent = data.city || 'Your City';
      formSuccess.classList.add('visible');
    }, 800);
  });
}
