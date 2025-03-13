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
