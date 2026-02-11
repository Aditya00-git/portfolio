const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
function resize(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
}
resize(); addEventListener("resize",resize);
const dots=[];
for(let i=0;i<120;i++){
  dots.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.5+.4,
    vx:(Math.random()-.5)*.3,
    vy:(Math.random()-.5)*.3
  });
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d=>{
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>canvas.width) d.vx*=-1;
    if(d.y<0||d.y>canvas.height) d.vy*=-1;
    ctx.beginPath();
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,.7)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
const reveals=document.querySelectorAll(".reveal");
function reveal(){
  const trigger=innerHeight*0.85;
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<trigger){
      el.classList.add("active");
    }
  });
}
addEventListener("scroll",reveal);
reveal();
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (pageYOffset >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
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
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = progress + "%";
});
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = savedTheme;
  icon.className =
    savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.className = "light";
    icon.className = "fas fa-sun";
    localStorage.setItem("theme", "light");
    updateParticles("light");
  } else {
    document.body.className = "dark";
    icon.className = "fas fa-moon";
    localStorage.setItem("theme", "dark");
    updateParticles("dark");
  }
});
function updateParticles(theme) {
  if (!window.pJSDom || !pJSDom.length) return;

  const color = theme === "dark" ? "#ffffff" : "#000000";

  pJSDom[0].pJS.particles.color.value = color;
  pJSDom[0].pJS.particles.line_linked.color = color;

  pJSDom[0].pJS.fn.particlesRefresh();
}
