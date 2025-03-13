class ParticleEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                angle: TWO_PI * (i / 10),
                speed: random(1, 3),
                life: 30
            });
        }
    }

    update() {
        for (let p of this.particles) {
            p.life--;
        }
    }

    display() {
        for (let p of this.particles) {
            let px = this.x + cos(p.angle) * p.speed * (30 - p.life);
            let py = this.y + sin(p.angle) * p.speed * (30 - p.life);
            fill(255, 150, 0);
            ellipse(px, py, 5);
        }
    }

    finished() {
        return this.particles.every(p => p.life <= 0);
    }
}
