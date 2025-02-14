let particles = [];
let particle;
let gravity;
let isPressed = false;

function setup() {
    createCanvas(800, 400);
    
    gravity = createVector(0, 0.1);
}

function draw() {
    background(190);
    if(isPressed) {
        line(mouseX, mouseY, particle.pos.x, particle.pos.y);
    }
    for (let i=0; i < particles.length; i++) {
        const particle = particles[i];
        particle.applyForce(gravity);
        particle.update();
        particle.display();
    }
}

function mousePressed() {
    isPressed = true;
    particle = new Particle(mouseX, mouseY, 15);
    particles.push(particle);
}

function mouseReleased() {
    isPressed = false;
    const mouse = createVector(mouseX, mouseY);
    const force = p5.Vector.sub(particle.pos, mouse);
    force.div(10);
    particle.applyForce(force);

}