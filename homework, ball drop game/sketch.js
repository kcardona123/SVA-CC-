let engine, world;
let game;
let startButton;

function setup() {
    createCanvas(600, 600);
    engine = Matter.Engine.create();
    world = engine.world;
    world.gravity.y = 0.5; // Gravity for the balls

    game = new Game();
    startButton = new StartButton();
}

function draw() {
    background(220);
    Matter.Engine.update(engine);

    if (!game.gameStarted) {
        startButton.display();
    } else {
        game.update();
        displayUI();
    }
}

function mousePressed() {
    if (!game.gameStarted) {
        startButton.checkClick();
        return;
    }

    for (let i = game.balls.length - 1; i >= 0; i--) {
        if (game.balls[i].clicked(mouseX, mouseY)) {
            game.score += 10;
            game.particles.push(new ParticleEffect(game.balls[i].body.position.x, game.balls[i].body.position.y));
            Matter.World.remove(world, game.balls[i].body);
            game.balls.splice(i, 1);
            break;
        }
    }
}
