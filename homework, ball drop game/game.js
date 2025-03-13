class Game {
    constructor() {
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.gameStarted = false;
        this.ballSpeed = 3; // Initial speed
        this.spawnRate = 60; // Initial spawn rate (one ball every 60 frames)
    }

    startGame() {
        this.gameStarted = true;
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.ballSpeed = 3; // Reset speed
        this.spawnRate = 60; // Reset spawn rate
    }

    update() {
        // Increase difficulty over time
        if (frameCount % 300 === 0) { // Every 5 seconds
            this.ballSpeed += 0.5; // Increase speed of falling balls
            this.spawnRate = max(10, this.spawnRate - 5); // Decrease spawn rate (spawn faster)
        }

        // Spawn balls at the current spawn rate
        if (frameCount % this.spawnRate === 0) {
            this.spawnBall();
        }

        // Update and draw balls
        for (let i = this.balls.length - 1; i >= 0; i--) {
            this.balls[i].update();
            this.balls[i].display();
            if (this.balls[i].isOffScreen()) {
                this.balls.splice(i, 1);
                this.loseLife();
            }
        }

        // Update and display particles
        this.displayParticles();
    }

    displayParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].display();
            if (this.particles[i].finished()) {
                this.particles.splice(i, 1); 
            }
        }
    }

    spawnBall() {
        let ballsToSpawn = 1;
    
        // Increase number of balls spawned over time
        if (frameCount > 300) { // After 5 seconds
            ballsToSpawn = 2; // Spawn 2 balls
        }
        if (frameCount > 600) { // After 10 seconds
            ballsToSpawn = 3; // Spawn 3 balls
        }
    
        for (let i = 0; i < ballsToSpawn; i++) {
            let x = random(100, 500);
            let vx = random(-2, 2);
            let ball = new Ball(x, 0, vx, this.ballSpeed); // Pass the increasing speed
            this.balls.push(ball);
        }
    }

    loseLife() {
        this.lives--;
        if (this.lives <= 0) {
            this.resetGame();
        }
    }

    resetGame() {
        this.gameStarted = false;
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.ballSpeed = 3; // Reset speed
        this.spawnRate = 60; // Reset spawn rate
    }

    displayUI() {
        fill(0);
        textSize(20);
        textAlign(RIGHT);
        text(`Lives: ${this.lives}`, width - 20, 30);
        text(`Score: ${this.score}`, width - 20, 60);
    }
}
