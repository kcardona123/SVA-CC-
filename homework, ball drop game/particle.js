class ParticleEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.radius = 20;  // Starting radius of the ring
        this.expansionRate = 2; // Rate at which the radius expands
        this.numParticles = 20;  // Number of particles in the ring
        this.rotationSpeed = 0.05; // Speed of rotation (adjust as needed)

        // Create particles with uniform distance
        for (let i = 0; i < this.numParticles; i++) {
            let angle = (TWO_PI / this.numParticles) * i; // Evenly space particles
            this.particles.push({
                angle: angle,
                life: 60,  // Lifetime of each particle
                speed: 2.3, // Speed at which particles expand
                distance: 0,  // Distance of each particle from the center, starts from 0
                size: 25, // Random size for each particle
                color: color(255, 253, 208), // Random color for each particle
                alpha: 255  // Full opacity initially
            });
        }
    }

    update() {
        // Increase the radius of the circle as time progresses
        this.radius += this.expansionRate * 0.05;

        // Rotate all particles
        for (let p of this.particles) {
            p.angle += this.rotationSpeed; // Update the angle to rotate the particle
            p.life--;  // Reduce the lifetime of each particle
            p.distance += p.speed;  // Expand the particle outward

            // Stop the particles after they reach a certain distance (optional)
            if (p.distance > this.radius * 2) {
                p.distance = this.radius * 2;
            }

            // Fade the particles over time by decreasing their alpha value
            p.alpha = map(p.life, 0, 60, 0, 255); // Gradually reduce opacity
        }
    }

    display() {
        for (let p of this.particles) {
            // Calculate the position of each particle based on its angle and distance
            let px = this.x + cos(p.angle) * (this.radius + p.distance);  // Use distance to move outward
            let py = this.y + sin(p.angle) * (this.radius + p.distance);

            // Set the particle's fill color with varying transparency (alpha)
            fill(p.color.levels[0], p.color.levels[1], p.color.levels[2], p.alpha); // Using random colors with alpha fading
            noStroke();
            ellipse(px, py, p.size); // Use random size for each particle
        }
    }

    finished() {
        // Check if all particles are "dead" (their life has ended)
        return this.particles.every(p => p.life <= 0);
    }
}
