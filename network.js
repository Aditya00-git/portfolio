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
const form = document.getElementById("contactForm");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const button = form.querySelector(".form-button");
    button.innerHTML = "Sending...";
    button.disabled = true;
    setTimeout(() => {
      button.innerHTML = "✓ Message Sent";
      button.classList.add("success");
      form.reset();
      setTimeout(() => {
        button.innerHTML = "Send Message";
        button.disabled = false;
        button.classList.remove("success");
      }, 3000);
    }, 1200);
  });
}
