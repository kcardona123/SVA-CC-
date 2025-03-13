class ParticleEffect {
    constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 10; i++) {
            this.particles.push({ x, y, angle: TWO_PI * i / 10, life: 30 });
        }
    }
    update() {
        this.particles.forEach(p => p.life--);
    }
    show() {
        this.particles.forEach(p => {
            if (p.life > 0) {
                let px = p.x + cos(p.angle) * (30 - p.life);
                let py = p.y + sin(p.angle) * (30 - p.life);
                fill(255, 255, 0);
                ellipse(px, py, 5);
            }
        });
    }
    finished() {
        return this.particles.every(p => p.life <= 0);
    }
}
