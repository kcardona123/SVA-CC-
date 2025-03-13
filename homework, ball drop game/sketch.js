let engine, world;
let balls = [];
let particles = [];
let score = 0;
let lives = 3;
let gameStarted = false;

function setup() {
    createCanvas(600, 600);
    engine = Matter.Engine.create();
    world = engine.world;
    Matter.Engine.run(engine);
}

function draw() {
    background(0);
    
    if (!gameStarted) {
        drawStartScreen();
        return;
    }
    
    updateGame();
    displayUI();
}

function mousePressed() {
    if (!gameStarted) {
        gameStarted = true;
        return;
    }
    
    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].isClicked(mouseX, mouseY)) {
            score++;
            particles.push(new ParticleEffect(balls[i].body.position.x, balls[i].body.position.y));
            balls[i].removeFromWorld();
            balls.splice(i, 1);
        }
    }
}