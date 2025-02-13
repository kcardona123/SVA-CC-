let particles = [];
let noiseOffset = 0;
let mouseWisp = []; // To track mouse interaction wisps

function setup() {

  console.log("p5.js sketch is running!"); // Debugging check
  let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container'); // Attach to the div
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
  background(60, 40, 20); // Warm coffee brown, set it only once here
  
}

function draw() {
  // Generate new steam trails at intervals
  if (frameCount % 15 === 0) {
    particles.push(new Particle(random(width), random(height * 0.6, height), 6));
  }

  // Generate extra trails when user clicks
  if (mouseIsPressed) {
    // Create a new particle system that follows the mouse
    if (mouseWisp.length === 0) {
      mouseWisp.push(new Particle(mouseX, mouseY, 6));
    }
    // Continue adding particles to the mouse wisp
    mouseWisp.push(new Particle(mouseX, mouseY, 6));
  }

  // If mouse is released, stop adding new particles to the mouse wisp
  if (!mouseIsPressed && mouseWisp.length > 0) {
    mouseWisp = []; // Clear the mouse wisp, stopping the tracking
  }

  // Update and display particles, allowing them to fade away
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isFinished()) {
      particles.splice(i, 1); // Remove finished particles
    }
  }

  // Update and display the mouse wisp particles, allowing them to fade away
  for (let i = mouseWisp.length - 1; i >= 0; i--) {
    mouseWisp[i].update();
    mouseWisp[i].show();
    if (mouseWisp[i].isFinished()) {
      mouseWisp.splice(i, 1); // Remove finished particles
    }
  }

  noiseOffset += 0.01;
}

// Particle class with Perlin noise & smooth blending
class Particle {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.alpha = 220; // Starting alpha
    this.maxAlpha = this.alpha; // Max alpha
    this.lifetime = 700; // Lifetime in frames
    this.age = 0; // Age counter
    this.level = level;
    this.baseSize = map(level, 6, 0, 10, 3); // Particle base size
    this.maxSize = this.baseSize * 2.5; // Maximum size
    this.size = this.baseSize;
    
    this.noiseSeed = random(1000); // Random noise seed for smooth motion

    this.spawned = false;
  }

  update() {
    this.age++;

    // Update position based on Perlin noise with slightly expanded movement
    let noiseX = noise(this.noiseSeed + this.age * 0.01) * 0.7 - 0.35; // Slightly larger noise range
    let noiseY = noise(this.noiseSeed + this.age * 0.01 + 100) * 0.7 - 0.35; // Slightly larger noise range
    this.x += noiseX * 1.0; // Faster particle movement
    this.y += noiseY * -0.7 - 0.7; // Slightly expanded vertical motion

    // Particle grows over time with smoother transitions
    let growFactor = sin(map(this.age, 0, this.lifetime, 0, PI));
    this.size = this.baseSize + (this.maxSize - this.baseSize) * growFactor;

    // Gradually reduce alpha to create a smooth fade-out effect
    this.alpha = this.maxAlpha * (1 - this.age / this.lifetime);

    // Spawn child particles if needed (for more continuous effect)
    if (this.level > 0 && !this.spawned && random() < 0.5) {
      particles.push(new Particle(this.x + random(-2, 2), this.y + random(-2, 2), this.level - 1));
      this.spawned = true;
    }
  }

  show() {
    // Draw particle with fading alpha and smoother size transitions
    fill(255, 230, 200, this.alpha); // Use particle's alpha value for fading
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isFinished() {
    return this.age >= this.lifetime; // Particle dies when it reaches its lifetime
  }
}
