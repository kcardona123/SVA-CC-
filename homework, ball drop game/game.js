class Game {
    constructor() {
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.gameStarted = false;
        this.ballSpeed = 3; // Initial ball speed
        this.spawnRate = 60; // Initial spawn rate
        this.ballsDropped = 0; // Track balls dropped
    }

    startGame() {
        this.gameStarted = true;
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.ballSpeed = 3; // Reset ball speed to initial value
        this.spawnRate = 60; // Reset spawn rate to initial value
        this.ballsDropped = 0; // Reset the number of balls dropped
    }

    update() {
        // Increase difficulty over time
        if (frameCount % 300 === 0) { // Every 5 seconds
            this.ballSpeed += 0.5; // Increase ball speed
            this.spawnRate = max(10, this.spawnRate - 5); // Increase ball spawn rate (faster spawn)
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

        // Spawn balls with current ballSpeed
        for (let i = 0; i < ballsToSpawn; i++) {
            let x = random(100, 500);
            let vx = random(-3, 3);
            let vy = random(2, 6);
            let ball = new Ball(x, 0, vx, vy); // Pass the updated speed
            this.balls.push(ball);
        }

        // Track how many balls have been spawned
        this.ballsDropped += ballsToSpawn;
    }

    loseLife() {
        this.lives--;
    
        if (this.lives <= 0) {
            // Update High Score & Longest Time
            highScore = max(highScore, this.score);
            let survivalTime = (millis() - this.startTime) / 1000;
            longestTime = max(longestTime, survivalTime);
            this.gameStarted = false;
            this.resetGame();
        }
    }
    

    resetGame() {
        this.gameStarted = false;
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0; // Reset score
        this.ballSpeed = 3; // Reset to initial ball speed
        this.spawnRate = 60; // Reset to initial spawn rate
        this.ballsDropped = 0; // Reset balls dropped counter
        frameCount = 0;
    }

    displayUI() {
        fill(0);
        textSize(20);
        textAlign(RIGHT);
        text(`Lives: ${this.lives}`, width - 20, 30);
        text(`Score: ${this.score}`, width - 20, 60);
    }
}
