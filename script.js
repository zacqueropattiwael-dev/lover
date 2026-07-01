const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const btn = document.getElementById("boomBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

class Particle{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.radius=Math.random()*3+1;

        this.dx=(Math.random()-0.5)*12;
        this.dy=(Math.random()-0.5)*12;

        this.life=120;

        this.color=`hsl(${Math.random()*360},100%,60%)`;

    }

    update(){

        this.x+=this.dx;
        this.y+=this.dy;

        this.dy+=0.05;

        this.life--;

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fillStyle=this.color;

        ctx.fill();

    }

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=particles.length-1;i>=0;i--){

        particles[i].update();

        particles[i].draw();

        if(particles[i].life<=0){

            particles.splice(i,1);

        }

    }

    requestAnimationFrame(animate);

}

animate();

btn.onclick=()=>{

    btn.style.display="none";

    const rect=btn.getBoundingClientRect();

    const x=rect.left+rect.width/2;

    const y=rect.top+rect.height/2;

    for(let i=0;i<150;i++){

        particles.push(new Particle(x,y));

    }

}
