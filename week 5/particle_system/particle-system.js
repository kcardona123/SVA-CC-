class ParticleSystem {

    constructor() {
        this.particles = [];
        this.gravity = createVector(0, 0.1);
    }
   
    addParticles(x, y, num) {
        for(let i = 0; i <num; i++) {
            const p =  new Particle(x, y, random(5, 10));
            const randomForce = p5.Vector.random2D();
            randomForce.setMag(random(1, 5))
            p.applyForce(randomForce);
            this.particles.push(p);
        }
    }

    loop() {
        for (let i = this.particles.length -1; i >= 0; i--) {
            const p = this.particles[i];
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
            p.applyForce(this.gravity);
            p.update();
            p.display();
        }
    }
}