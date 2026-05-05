// ===== SCROLL TO TOP & WHATSAPP =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const scrollToTopBtn = document.getElementById("scrollToTop");
const whatsappBtn = document.querySelector(".whatsapp-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("active");
    whatsappBtn.classList.add("active");
  } else {
    scrollToTopBtn.classList.remove("active");
    whatsappBtn.classList.remove("active");
  }
});

// ===== LOADER =====
window.addEventListener("load", () => {
  const loaderCurtain = document.getElementById("loaderCurtain");
  loaderCurtain.classList.add("animate-out");
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 3400);
});

// ===== CURSOR =====
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document
  .querySelectorAll("a, button, .product-card, .cat-card, .filter-tab")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursorRing.style.width = "60px";
      cursorRing.style.height = "60px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursorRing.style.width = "40px";
      cursorRing.style.height = "40px";
    });
  });

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

revealEls.forEach((el) => observer.observe(el));

// ===== FILTER TABS =====
function filterProducts(btn, cat) {
  document
    .querySelectorAll(".filter-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".product-card").forEach((card) => {
    if (cat === "all" || card.dataset.cat === cat) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.4s ease forwards";
    } else {
      card.style.display = "none";
    }
  });
}

// ===== NAV SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 80) {
    nav.classList.add("scrolled");
    nav.style.padding = "16px 48px";
  } else {
    nav.classList.remove("scrolled");
    nav.style.padding = "24px 48px";
  }
});

// ===== QUICK VIEW MODAL =====
let currentQuickViewProduct = null;

function openQuickView(product) {
  currentQuickViewProduct = product;
  const modal = document.getElementById("quickViewModal");

  document.getElementById("quickViewName").textContent = product.name;
  document.getElementById("quickViewPrice").textContent = product.price;
  document.getElementById("quickViewOldPrice").textContent = product.oldPrice;
  document.getElementById("quickViewDiscount").textContent =
    "-" +
    Math.round(
      ((parseInt(product.oldPrice.replace("₹", "").replace(",", "")) -
        parseInt(product.price.replace("₹", "").replace(",", ""))) /
        parseInt(product.oldPrice.replace("₹", "").replace(",", ""))) *
        100,
    ) +
    "%";
  document.getElementById("quickViewDesc").textContent = product.description;
  document.getElementById("quickViewImg").style.background = product.image;

  const sizesContainer = document.getElementById("quickViewSizes");
  sizesContainer.innerHTML = "";
  product.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button");
    sizeBtn.className = "qv-size-option";
    sizeBtn.textContent = size;
    sizeBtn.type = "button";
    sizeBtn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".qv-size-option")
        .forEach((s) => (s.style.background = "rgba(201,168,76,0.1)"));
      e.target.style.background = "rgba(201,168,76,0.3)";
    });
    sizesContainer.appendChild(sizeBtn);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  currentQuickViewProduct = null;
}

function openContactModalFromQuickView() {
  if (currentQuickViewProduct) {
    closeQuickView();
    openContactModal({
      name: currentQuickViewProduct.name,
      price: currentQuickViewProduct.price,
      image: currentQuickViewProduct.image,
    });
  }
}

// ===== CONTACT MODAL =====
function openContactModal(product) {
  const modal = document.getElementById("contactModal");
  document.getElementById("modalProductName").textContent = product.name;
  document.getElementById("modalProductPrice").textContent = product.price;
  document.getElementById("modalProductImg").style.background = product.image;
  document.getElementById("successMessage").style.display = "none";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.querySelector(".modal-form").reset();
}

function submitContactForm(e) {
  e.preventDefault();
  const form = document.querySelector(".modal-form");
  const successMessage = document.getElementById("successMessage");

  // Get form data
  const name = form.querySelector('input[type="text"]').value;
  const phone = form.querySelector('input[type="tel"]').value;

  // Show success message
  successMessage.style.display = "block";
  form.style.opacity = "0.6";
  form.style.pointerEvents = "none";

  // Reset after 3 seconds
  setTimeout(() => {
    closeContactModal();
    form.style.opacity = "1";
    form.style.pointerEvents = "auto";
  }, 3000);
}

// Close modals when pressing Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeContactModal();
    closeQuickView();
  }
});

// ===== WISHLIST TOGGLE =====
document.querySelectorAll(".product-wishlist").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = btn.textContent === "♡" ? "♥" : "♡";
    btn.style.background =
      btn.textContent === "♥" ? "var(--red)" : "rgba(0,0,0,0.4)";
    btn.style.color = btn.textContent === "♥" ? "#fff" : "inherit";
    btn.style.borderColor =
      btn.textContent === "♥" ? "var(--red)" : "rgba(255,255,255,0.3)";
  });
});

// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});
