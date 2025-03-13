function updateGame() {
    if (frameCount % 60 === 0) {
        balls.push(new Ball(random(width), -20, random(-2, 2), random(2, 5)));
    }
    
    for (let i = balls.length - 1; i >= 0; i--) {
        balls[i].show();
        if (balls[i].offScreen()) {
            lives--;
            balls[i].removeFromWorld();
            balls.splice(i, 1);
        }
    }
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
    
    if (lives <= 0) {
        resetGame();
    }
}

function resetGame() {
    gameStarted = false;
    balls = [];
    particles = [];
    score = 0;
    lives = 3;
}
