const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setMenu(open) {
  body.classList.toggle("nav-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
}

menuToggle?.addEventListener("click", () => {
  setMenu(!body.classList.contains("nav-open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

function updateActiveLink() {
  const offset = header?.offsetHeight ?? 0;
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top + window.scrollY - offset - 80;
    return window.scrollY >= top ? section : active;
  }, sections[0]);

  navLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    link.classList.toggle("is-active", target === current);
  });
}

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveLink();
}, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    setMenu(false);
  }
  updateActiveLink();
});

document.querySelector("[data-signup-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");
  if (status) {
    status.textContent = "Спасибо! Мы свяжемся с вами, чтобы подобрать время урока.";
  }
  form.reset();
});

updateHeaderState();
updateActiveLink();
