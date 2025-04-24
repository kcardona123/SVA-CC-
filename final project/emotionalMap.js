function mapWeatherToEmotion(temp, precip, cloud) {
  let emotions = [];
  
  if (precip > 0.001) {
    emotions.push("Melancholy");
  }
  
  if (cloud > 70) {
    emotions.push("Contemplative");
  }

  if (temp > 60) {
    emotions.push("Energetic");
  }
  
  if (temp < 50) {
    emotions.push("Calm");
  }
  
  if (emotions.length === 0) {
    emotions.push("Neutral");
  }

  return emotions;
}

function drawEmotionEffect(emotions, time) {
  // Draw each effect for the corresponding emotion
  emotions.forEach(emotion => {
    switch (emotion) {
      case "Melancholy":
        drawRainEffect();
        drawMVignette();
        break;
      case "Contemplative":
        drawCloudOverlay();
        drawC1Vignette();
        break;
      case "Energetic":
        drawSunburst();
        drawEVignette();
        break;
      case "Calm":
        drawWindStrokes();
        drawC2Vignette();
        break;
      case "Neutral":
        drawGentleGlow();
        gcolor = 'rgb(0, 0, 0)'
        break;
    }
  });

  // Add rotating ring of circles that changes color based on time of day
  drawRotatingRing(time);
}

let raindrops = [];

function drawRainEffect() {
  emitRaindropsFromRing();
  updateAndDrawRaindrops();
}

function emitRaindropsFromRing() {
  if (fluidParticles.length === 0) return;

  for (let i = 0; i < fluidParticles.length; i++) {
    if (random() < 0.3) { // Lower = fewer drops = more subtle
      let pos = getParticlePosition(fluidParticles[i]);
      raindrops.push({
        x: width / 2 + pos.x,
        y: height / 2 + pos.y,
        speed: random(4, 7),
        len: random(8, 14),
        alpha: 200
      });
    }
  }
}

function updateAndDrawRaindrops() {
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let r = raindrops[i];
    stroke(150, 150, 255, r.alpha);
    line(r.x, r.y, r.x, r.y + r.len);
    r.y += r.speed;
    r.alpha -= 2;

    if (r.y > height || r.alpha < 0) {
      raindrops.splice(i, 1); // Remove if off screen or invisible
    }
  }
}


let fogParticles = [];

function drawCloudOverlay() {
  
  updateAndDrawFog();
}

function switchEmotion(emotion) {
  if (emotion === "Contemplative") {
    emitFogFromRing();
  }

}

function emitFogFromRing() {
  if (fluidParticles.length === 0) return;
  
  for (let i = 0; i < fluidParticles.length; i++) {
    if (random() < 0.2) { // Adjust fog density
      let pos = getParticlePosition(fluidParticles[i]);
      fogParticles.push({
        x: width / 2 + pos.x,
        y: height / 2 + pos.y,
        vx: random(-0.2, 0.2),
        vy: random(-0.1, 0.3),
        alpha: 100,
        size: random(40, 80),
        life: 255
      });
    }
  }
}

function updateAndDrawFog() {
  for (let i = fogParticles.length - 1; i >= 0; i--) {
    let p = fogParticles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.8;
    p.alpha = map(p.life, 0, 255, 0, 100);

    noStroke();
    fill(200, 200, 200, p.alpha);
    ellipse(p.x, p.y, p.size);

    if (p.life <= 0) {
      fogParticles.splice(i, 1);
    }
  }
}

let fireParticles = [];

function drawSunburst() {
  emitFireFromRing();
  updateAndDrawFire();
}

function emitFireFromRing() {
  if (fluidParticles.length === 0) return;

  for (let i = 0; i < fluidParticles.length; i++) {
    if (random() < 0.3) { // Adjust fire density
      let pos = getParticlePosition(fluidParticles[i]);
      fireParticles.push({
        x: width / 2 + pos.x,
        y: height / 2 + pos.y,
        vx: random(-0.2, 0.2),
        vy: random(-2, -4), // Move upward (negative Y velocity)
        alpha: 255,
        size: random(8, 20),
        life: 255,
        color: color(random(255, 255), random(150, 255), 0) // Fire colors: yellow to red
      });
    }
  }
}

function updateAndDrawFire() {
  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.size *= 0.98;  // Shrink fire particles slightly
    p.alpha -= 2;    // Fade out the fire
    p.life -= 4;     // Decrease life of particle

    // Change color over time (from yellow to red)
    let fireColor = lerpColor(color(255, 255, 0), color(255, 0, 0), p.life / 255);
    
    noStroke();
    fill(fireColor.levels[0], fireColor.levels[1], fireColor.levels[2], p.alpha);
    ellipse(p.x, p.y, p.size);

    if (p.life <= 0) {
      fireParticles.splice(i, 1);
    }
  }
}


let windStrokes = [];

function drawWindStrokes() {
  noFill();
  stroke(100, 150, 255, 80);  // Faint blue color
  strokeWeight(2);

  // Create multiple wind strokes with different starting positions and speeds
  if (windStrokes.length === 0) {
    for (let i = 0; i < 5; i++) { // Create 5 dynamic wind strokes
      windStrokes.push({
        offsetX: random(-1000, 0), // Random start position off-screen
        speed: random(1, 3),       // Random speed for variety
        amplitude: random(10, 30), // Random amplitude for wind strokes
        phaseShift: random(0, TWO_PI), // Random phase shift for variety
      });
    }
  }

  // Draw and update each wind stroke
  for (let i = 0; i < windStrokes.length; i++) {
    let strokeData = windStrokes[i];

    // Update the offset for left-to-right movement
    strokeData.offsetX += strokeData.speed;
    if (strokeData.offsetX > width) {
      // Reset the stroke to the left once it goes off-screen
      strokeData.offsetX = -1000;
    }

    // Create the wind stroke shape by moving from left to right
    beginShape();
    for (let x = 0; x < width; x += 20) {
      let yOffset = sin(x * 0.02 + frameCount * 0.05 + strokeData.phaseShift) * strokeData.amplitude;
      vertex(x + strokeData.offsetX, height / 2 + yOffset); // Move the stroke left to right
    }
    endShape();
  }
}


function drawGentleGlow() {
  noStroke();
  fill(255, 255, 200, 60);
  ellipse(width / 2, height / 2, 300 + sin(frameCount * 0.1) * 10);
}

let fluidParticles = [];

function setupFluidParticles() {
  let numParticles = 40;
  let baseRadius = 120;

  for (let i = 0; i < numParticles; i++) {
    let angle = (TWO_PI / numParticles) * i;
    fluidParticles.push({
      angle: angle,
      baseRadius: baseRadius,
      radius: baseRadius,
      speed: 0.005,
      size: 22,
      offset: random(1000),
    });
  }
}

function drawRotatingRing(time) {
  if (fluidParticles.length === 0) setupFluidParticles();

  push();
  translate(width / 2, height / 2);

  // Parse time into fractional hour for smooth color transition
  let hour = int(time.slice(11, 13));
  let minute = int(time.slice(14, 16));
  let timeOfDay = hour + minute / 60;

  if (prevHour !== hour) {
    gTime = 0;
    prevHour = hour;
  }

  // Color transition factor (t) based on time of day
  let t;
  if (timeOfDay >= 6 && timeOfDay <= 18) {
    t = map(hour, 6, 18, 0, 1); // Morning to evening
  } else if (timeOfDay > 18) {
    t = map(hour, 18, 24, 1, 0); // Evening to night
  } else {
    t = map(hour, 0, 6, 1, 0); // Night to morning
  }
  // Define day and night colors
  let nightColor = color(75, 0, 130);     // Indigo
  let dayColor = color(255, 255, 200);    // Cream

  
  let baseColor = lerpColor(nightColor, dayColor, sinTime);
  // Rotate all particles slightly
  for (let p of fluidParticles) {
    p.angle += p.speed;
    p.radius = p.baseRadius + sin(frameCount * 0.02 + p.offset) * 3;
  }

  // Apply soft collisions to make fluid effect
  for (let i = 0; i < fluidParticles.length; i++) {
    for (let j = i + 1; j < fluidParticles.length; j++) {
      let a = getParticlePosition(fluidParticles[i]);
      let b = getParticlePosition(fluidParticles[j]);
      let d = dist(a.x, a.y, b.x, b.y);
      let minDist = (fluidParticles[i].size + fluidParticles[j].size) * 0.55;

      if (d < minDist) {
        let pushAmount = (minDist - d) * 0.03;
        let angle = atan2(b.y - a.y, b.x - a.x);
        fluidParticles[i].radius -= pushAmount * 0.5;
        fluidParticles[j].radius += pushAmount * 0.5;
      }
    }
  }

  // Draw particles with full visibility
  noStroke();
  fill(baseColor); // Fully visible, no alpha
  for (let p of fluidParticles) {
    let pos = getParticlePosition(p);
    ellipse(pos.x, pos.y, p.size, p.size);
  }

  pop();
}

function getParticlePosition(p) {
  return {
    x: p.radius * cos(p.angle),
    y: p.radius * sin(p.angle),
  };
}

function drawMVignette() {
  // Use native canvas context for gradient
  let ctx = drawingContext; // alias for canvas.getContext("2d")
  let radius = Math.max(width, height) * 0.75;

  // Create radial gradient
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.3,  // inner circle (center, inner radius)
    width / 2, height / 2, radius         // outer circle (center, outer radius)
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgb(32, 46, 152)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawC1Vignette() {
  // Use native canvas context for gradient
  let ctx = drawingContext; // alias for canvas.getContext("2d")
  let radius = Math.max(width, height) * 0.75;

  // Create radial gradient
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.3,  // inner circle (center, inner radius)
    width / 2, height / 2, radius         // outer circle (center, outer radius)
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgb(158, 36, 152)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawEVignette() {
  // Use native canvas context for gradient
  let ctx = drawingContext; // alias for canvas.getContext("2d")
  let radius = Math.max(width, height) * 0.75;

  // Create radial gradient
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.3,  // inner circle (center, inner radius)
    width / 2, height / 2, radius         // outer circle (center, outer radius)
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgb(255, 251, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawC2Vignette() {
  // Use native canvas context for gradient
  let ctx = drawingContext; // alias for canvas.getContext("2d")
  let radius = Math.max(width, height) * 0.75;

  // Create radial gradient
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.3,  // inner circle (center, inner radius)
    width / 2, height / 2, radius         // outer circle (center, outer radius)
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgb(65, 208, 149)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
