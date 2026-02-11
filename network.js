const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
let particles = [];
let count = window.innerWidth < 768 ? 45 : 90; 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Particle {
  constructor(x, y){
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.size = 1.3;
  }
  move(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
for(let i=0;i<count;i++){
  particles.push(new Particle());
}
function connect(){
  for(let i=0;i<particles.length;i++){
    for(let j=i;j<particles.length;j++){
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 150){
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist/120})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.move();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener("click",(e)=>{
  for(let i=0;i<5;i++){
    particles.push(new Particle(e.clientX, e.clientY));
  }
});
