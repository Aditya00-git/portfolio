const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
let particles = [];
const SPEED = 1.2;
const COUNT = window.innerWidth < 768 ? 50 : 90;
const CONNECT_DISTANCE = 160;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Particle {
  constructor(x, y) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? Math.random() * canvas.height;
    this.depth = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * SPEED * this.depth;
    this.vy = (Math.random() - 0.5) * SPEED * this.depth;
    this.size = 1.5 * this.depth;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
for (let i = 0; i < COUNT; i++) {
  particles.push(new Particle());
}
function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DISTANCE) {
        const opacity = 1 - dist / CONNECT_DISTANCE;
        ctx.shadowColor = "#00ffff";
        ctx.strokeStyle = `rgba(0,255,255,${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.shadowBlur = 0;
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("click", e => {
  for (let i = 0; i < 8; i++) {
    const p = new Particle(e.clientX, e.clientY);
    p.vx = (Math.random() - 0.5) * 4;
    p.vy = (Math.random() - 0.5) * 4;
    particles.push(p);
  }
});
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
/* =========================
   MOBILE MENU FIX
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("show") &&
      !navLinks.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navLinks.classList.remove("show");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const button = form.querySelector(".form-button");
    button.innerHTML = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        button.innerHTML = "✓ Message Sent";
        button.classList.add("success");
        form.reset();
      } else {
        button.innerHTML = "Error. Try Again";
        button.style.background = "#ef4444";
      }
    } catch (error) {
      button.innerHTML = "Network Error";
      button.style.background = "#ef4444";
    }

    setTimeout(() => {
      button.innerHTML = "Send Message";
      button.disabled = false;
      button.classList.remove("success");
      button.style.background = "";
    }, 3000);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});
// ===== PREMIUM HERO TYPING =====
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".typing-text");
  if (!el) return;

  const words = [
    "intelligent digital systems",
    "scalable backend architectures",
    "AI-powered applications"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = words[wordIndex];

    if (!deleting) {
      el.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 40 : 60);
  }

  type();
});
// ===== EXPERIENCE STAGGER REVEAL =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".reveal-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 250);
  });
});
// ===== TIMELINE SCROLL ANIMATION =====
document.addEventListener("scroll", () => {
  const timeline = document.querySelector(".timeline");
  const line = document.querySelector(".timeline-line");

  if (!timeline || !line) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visible = Math.min(
    Math.max(windowHeight - rect.top, 0),
    rect.height
  );

  line.style.height = visible + "px";
});
// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal-card").forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.7s ease";
  observer.observe(card);
});
