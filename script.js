const brands = [
  { name: "The Rare Ingredient", title: "COLD PRESSED. SILKY. ONE INGREDIENT.", copy: "Cold pressed from wild Vitellaria nilotica in Northern Uganda, this rare balm melts on contact and absorbs quickly, delivering rich moisture with a silky finish.", year: "Northern Uganda", bg: "linear-gradient(135deg, #f5f0e8, #c8a456 48%, #e8dcc8)", panel: "#f5f0e8", color: "#1a3a2a" },
  { name: "The Silky Difference", title: "RARE TEXTURE. INSTANT ABSORPTION.", copy: "This is the shea most people haven't tried yet. A smooth, smooth texture that melts in fast, rather than the harder, heavier bar many people expect from shea butter.", year: "East African Nile Belt", bg: "linear-gradient(135deg, #e8dcc8, #8fa88b 48%, #d4c9b5)", panel: "#e8dcc8", color: "#1a3a2a" },
  { name: "One-Jar Ritual", title: "FACE. LIPS. BODY. HAIR ENDS.", copy: "One versatile jar replaces unnecessary complexity. No synthetic fillers and no added fragrance. Just pure East African luxury for everyday softness.", year: "100% Nilotica Shea", bg: "linear-gradient(135deg, #00539C, #00539C 45%, #00539C)", panel: "#1a3a2a", color: "#f5f0e8" },
  { name: "Women-Led Source", title: "DIRECT PARTNERSHIPS. SHARED VALUE.", copy: "Women led cooperatives in Northern Uganda gather wild fallen nuts. Cooperative premiums help support community infrastructure, financial independence, and tree conservation.", year: "Cooperative Sourcing", bg: "linear-gradient(135deg, #c8a456, #a08540 50%, #f5f0e8)", panel: "#c8a456", color: "#1a3a2a" }
];

const testimonials = [
  { text: "A silky, quick melting texture gives Nilotica its signature feel and quick absorption.", author: "Texture" },
  { text: "A silky, quick melting texture that sinks in quickly, leaving skin soft instead of sitting on top of it.", author: "Performance" },
  { text: "Direct cooperative partnerships connect every jar to women harvesters and tree conservation in Northern Uganda.", author: "Source" }
];

const menuButton = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.classList.remove("active");
  mobileNav.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("active");
    mobileNav.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
window.addEventListener("load", () => {
  if (window.location.hash) {
    document.querySelector(window.location.hash)?.scrollIntoView();
  }
});

const carousel = document.querySelector(".brand-carousel");
const brandSection = document.querySelector(".brand-section");
let activeBrand = 2;
let expandedBrand = null;

function renderBrands() {
  if (!carousel) return;
  carousel.innerHTML = brands.map((brand, index) => `
    <article class="brand-slide" style="--brand-bg:${brand.bg};--brand-panel:${brand.panel};--brand-color:${brand.color};">
      <div class="brand-hero" role="button" tabindex="0" aria-label="Open ${brand.name}">
        <div class="brand-logo-text">${brand.name}</div>
      </div>
      <div class="brand-info">
        <button class="brand-info-close" type="button" aria-label="Close ${brand.name} details">&times;</button>
        <div class="brand-info-left">
          <h3>${brand.title}</h3>
          <p>${brand.copy}</p>
          <a class="pill-btn brand-button" href="products.html">Discover the Ritual</a>
          <div class="brand-meta">
            <span>Origin:</span>
            <span>${brand.year}</span>
          </div>
        </div>
        <div class="brand-gallery" aria-hidden="true">
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
        </div>
      </div>
    </article>
  `).join("");

  carousel.querySelectorAll(".brand-hero").forEach((hero, index) => {
    hero.addEventListener("click", () => expandBrand(index));
    hero.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        expandBrand(index);
      }
    });
  });
  carousel.querySelectorAll(".brand-info-close").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      collapseBrand();
    });
  });
  updateBrandClasses();
}

function updateBrandClasses() {
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll(".brand-slide")];
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeBrand);
    slide.classList.toggle("prev", index === (activeBrand - 1 + brands.length) % brands.length && expandedBrand === null);
    slide.classList.toggle("next", index === (activeBrand + 1) % brands.length && expandedBrand === null);
    slide.classList.toggle("expanded", index === expandedBrand);
  });
  brandSection?.classList.toggle("opened", expandedBrand !== null);
}

function goBrand(direction) {
  activeBrand = (activeBrand + direction + brands.length) % brands.length;
  if (expandedBrand !== null) {
    expandedBrand = activeBrand;
  }
  updateBrandClasses();
}

function expandBrand(index) {
  activeBrand = index;
  expandedBrand = expandedBrand === index && window.innerWidth <= 768 ? null : index;
  updateBrandClasses();
}

function collapseBrand() {
  expandedBrand = null;
  updateBrandClasses();
}

renderBrands();
document.querySelector(".prev-brand")?.addEventListener("click", () => goBrand(-1));
document.querySelector(".next-brand")?.addEventListener("click", () => goBrand(1));
document.querySelector(".brand-close")?.addEventListener("click", collapseBrand);

let autoBrand = window.setInterval(() => goBrand(1), 14000);
brandSection?.addEventListener("mouseenter", () => window.clearInterval(autoBrand));
brandSection?.addEventListener("mouseleave", () => {
  autoBrand = window.setInterval(() => goBrand(1), 14000);
});

const testimonialText = document.querySelector(".testimonial-text");
const testimonialAuthor = document.querySelector(".testimonial-author");
let activeTestimonial = 0;

function updateTestimonial() {
  if (!testimonialText || !testimonialAuthor) return;
  testimonialText.textContent = `"${testimonials[activeTestimonial].text}"`;
  testimonialAuthor.textContent = testimonials[activeTestimonial].author;
}

function goTestimonial(direction) {
  activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
  updateTestimonial();
}

document.querySelector(".testimonial-prev")?.addEventListener("click", () => goTestimonial(-1));
document.querySelector(".testimonial-next")?.addEventListener("click", () => goTestimonial(1));
updateTestimonial();

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}
function initParticles() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const NUM = window.innerWidth < 768 ? 30 : 50;

  const particles = [];

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

 const COLORS = [
  { r: 0, g: 83, b: 156 },    // sapphire blue
  { r: 64, g: 156, b: 255 },  // bright blue
  { r: 173, g: 216, b: 255 }, // light blue
  { r: 230, g: 245, b: 255 }, // icy blue
  { r: 120, g: 190, b: 255 }  // soft sky blue
];

  for (let i = 0; i < NUM; i++) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.2 - 0.05,
      color,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.015 + 0.008,
      glowSize: Math.random() * 6 + 3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.pulse += p.pulseSpeed;

      const alpha =
        p.alpha +
        Math.sin(p.pulse) * 0.12;

      const dxMouse = mouse.x - p.x;
      const dyMouse = mouse.y - p.y;

      const dist = Math.sqrt(
        dxMouse * dxMouse +
        dyMouse * dyMouse
      );

      if (dist < 200) {
        p.x += dxMouse * 0.0008;
        p.y += dyMouse * 0.0008;
      }

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.glowSize
      );

      gradient.addColorStop(
        0,
        `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha * 0.4})`
      );

      gradient.addColorStop(
        1,
        `rgba(${p.color.r},${p.color.g},${p.color.b},0)`
      );

      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        p.glowSize,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha})`;

      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

initParticles();
