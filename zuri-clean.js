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

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (status) status.textContent = "Sending...";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(form.getAttribute("action") || "/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || "Failed to send message.");
      }

      form.reset();
      if (status) status.textContent = result.message || "Message sent successfully.";
    } catch {
      if (status) status.textContent = "Failed to send message. Please try again or email us directly.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

const qrWelcome = document.getElementById("qr-welcome");

if (qrWelcome) {
  const params = new URLSearchParams(window.location.search);
  const shouldShowQrWelcome = params.get("qr") === "1";
  const closeButtons = qrWelcome.querySelectorAll("[data-qr-close]");
  const closeQrWelcome = () => {
    qrWelcome.hidden = true;
    document.body.classList.remove("qr-welcome-open");
  };

  if (shouldShowQrWelcome) {
    qrWelcome.hidden = false;
    document.body.classList.add("qr-welcome-open");
    qrWelcome.querySelector(".qr-welcome-close")?.focus();
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeQrWelcome);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !qrWelcome.hidden) closeQrWelcome();
  });
}
