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
        ctx.shadowColor = "#00ddff";
        ctx.strokeStyle = `rgba(0,255,255,${opacity * 0.8})`;
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
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("fullscreenMenu");
  const close = document.getElementById("menuClose");
  toggle.addEventListener("click", () => {
    menu.classList.add("active");
    document.body.classList.add("menu-open");
  });
  close.addEventListener("click", () => {
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const glow = document.querySelector(".mouse-glow");
  if (!glow) return;
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animate() {
    currentX += (mouseX - currentX) * 0.35;
    currentY += (mouseY - currentY) * 0.35;
    glow.style.left = currentX + "px";
    glow.style.top = currentY + "px";
    requestAnimationFrame(animate);
  }
  animate();
});
let lastScroll = 0;
const header = document.querySelector(".top-bar");
let isHidden = false;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 80) {
    if (!isHidden) {
      header.classList.add("step-down");
      setTimeout(() => {
        header.classList.remove("step-down");
        header.classList.add("hide");
      }, 150);
      isHidden = true;
    }
  } else {
    if (isHidden) {
      header.classList.remove("hide");
      header.classList.add("step-down");
      setTimeout(() => {
        header.classList.remove("step-down");
      }, 150);
      isHidden = false;
    }
  }
  lastScroll = currentScroll;
});
window.addEventListener("click", e => {
  if (document.body.classList.contains("menu-open")) return;
  for (let i = 0; i < 8; i++) {
    const p = new Particle(e.clientX, e.clientY);
    p.vx = (Math.random() - 0.5) * 4;
    p.vy = (Math.random() - 0.5) * 4;
    particles.push(p);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("intro-loader");
  const introText = document.getElementById("intro-text");

  if (sessionStorage.getItem("introShown")) {
    loader.style.display = "none";
    return;
  }

  const sequence = [
    "ENGINEERING",
    "INTELLIGENCE",
    "SCALABILITY",
    "INNOVATION",
    "Automation",
    "ADITYA SESWANI"
  ];

  let index = 0;

  function showNext() {
    if (index < sequence.length) {
      introText.textContent = sequence[index];
      introText.classList.remove("animate-text");
      void introText.offsetWidth;
      introText.classList.add("animate-text");
      index++;
      setTimeout(showNext, 900);
    } else {
      setTimeout(() => {
        loader.classList.add("loader-exit");
        sessionStorage.setItem("introShown", "true");
      }, 1000);
    }
  }

  setTimeout(showNext, 800);
});
document.addEventListener("DOMContentLoaded", () => {
  const transition = document.getElementById("page-transition");
  const transitionText = document.querySelector(".transition-text");
  const messages = {
    "index.html": "Welcome to home.",
    "about.html": "About Me.",
    "projects.html": "Wanna know what i build, Have a look.",
    "experience.html": "My Experience and Achivements.",
    "contact.html": "Wanna Discuss something, Let's connect.",
    "guestbook.html": "Drop a comment on giscuss."
  };
const isMobile = window.innerWidth <= 768;
  document.querySelectorAll("a").forEach(link => {
    if(link.hostname === window.location.hostname){
      link.addEventListener("click", function(e){
        e.preventDefault();
        const href = this.getAttribute("href");
        if(!href || href.startsWith("#")) return;
        const file = href.split("/").pop();
        transitionText.textContent = messages[file] || "Loading...";
        transition.classList.add("active");
        const delay = isMobile ? 1200 : 1700;
        setTimeout(() => {
          window.location.href = href;
        }, delay);
      });
    }
  });
});
