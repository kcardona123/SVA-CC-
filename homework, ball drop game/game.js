class Game {
    constructor() {
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
        this.gameStarted = false;
    }

    startGame() {
        this.gameStarted = true;
        this.balls = [];
        this.particles = [];
        this.lives = 3;
        this.score = 0;
    }

    update() {
        if (frameCount % 60 === 0) {
            this.spawnBall();
        }

        
        for (let i = this.balls.length - 1; i >= 0; i--) {
            this.balls[i].update();
            this.balls[i].display();
            if (this.balls[i].isOffScreen()) {
                this.balls.splice(i, 1);
                this.loseLife();
            }
        }

       
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
        let x = random(100, 500);
        let vx = random(-2, 2);
        let ball = new Ball(x, 0, vx);
        this.balls.push(ball);
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
    }

    displayUI() {
        fill(0);
        textSize(20);
        textAlign(RIGHT);
        text(`Lives: ${this.lives}`, width - 20, 30);
        text(`Score: ${this.score}`, width - 20, 60);
    }
}
