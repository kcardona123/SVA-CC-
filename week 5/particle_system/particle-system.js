class ParticleSystem {

    constructor() {
        this.particles = [];
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
        for (let i=0; i< this.particles.length; i++ ) {
            const p = this.particles[i];
            p.update();
            p.display();
        }
    }
}