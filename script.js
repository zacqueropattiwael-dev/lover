const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("boomBtn");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.radius = Math.random() * 3 + 1;

        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12;

        this.life = 120;

        this.color = `hsl(${Math.random() * 360},100%,60%)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.05; // gravitasi

        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();

btn.addEventListener("click", () => {

    btn.style.display = "none";

    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    for (let i = 0; i < 150; i++) {
        particles.push(new Particle(x, y));
    }

});
