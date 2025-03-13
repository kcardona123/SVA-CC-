let engine, world;
let game;
let startButton;

function setup() {
    createCanvas(600, 600);
    engine = Matter.Engine.create();
    world = engine.world;
    world.gravity.y = 0.5;

    game = new Game();
    startButton = new StartButton();
}

function draw() {
    background(0, 0, 0, 150); // White background
    Matter.Engine.update(engine);

    if (!game.gameStarted) {
        startButton.display();
    } else {
        game.update();
        game.displayUI();
    }
}

function mousePressed() {
    if (!game.gameStarted) {
        startButton.checkClick(); // Start the game if the start button is clicked
        return;
    }

    // If the game has ended (lives <= 0), reset the game when the player clicks
    if (game.lives <= 0) {
        game.resetGame(); // Reset the game
        return;
    }

    // Handle clicking on balls during the game
    for (let i = game.balls.length - 1; i >= 0; i--) {
        if (game.balls[i].clicked(mouseX, mouseY)) {
            game.score += 10;
            let ballPos = game.balls[i].body.position;

            // Add the particle effect at the clicked ball's position
            game.particles.push(new ParticleEffect(ballPos.x, ballPos.y));

            Matter.World.remove(world, game.balls[i].body);
            game.balls.splice(i, 1);
            break;
        }
    }
}