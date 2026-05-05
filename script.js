// ===== LOADER =====
  window.addEventListener('load', () => {
    const loaderCurtain = document.getElementById('loaderCurtain');
    loaderCurtain.classList.add('animate-out');
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 3400);
  });

  // ===== CURSOR =====
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .product-card, .cat-card, .filter-tab').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width = '40px';
      cursorRing.style.height = '40px';
    });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ===== FILTER TABS =====
  function filterProducts(btn, cat) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.product-card').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== NAV ACTIVE LINKS =====
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
      nav.style.padding = '16px 48px';
    } else {
      nav.style.padding = '24px 48px';
    }
  });

  // ===== CART BUTTON =====
  let cartCount = 0;
  document.querySelectorAll('.product-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      document.querySelector('.nav-cart').textContent = `🛍 Cart (${cartCount})`;
      btn.textContent = '✓ Added!';
      btn.style.background = '#2d5a27';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Quick Add +';
        btn.style.background = 'var(--gold)';
        btn.style.color = 'var(--black)';
      }, 1500);
    });
  });

  // ===== WISHLIST TOGGLE =====
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
      btn.style.background = btn.textContent === '♥' ? 'var(--red)' : 'rgba(0,0,0,0.4)';
      btn.style.color = btn.textContent === '♥' ? '#fff' : 'inherit';
      btn.style.borderColor = btn.textContent === '♥' ? 'var(--red)' : 'rgba(255,255,255,0.3)';
    });
  });