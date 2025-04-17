function mapWeatherToEmotion(temp, precip, cloud) {
  if (precip > 0.1) {
    return "Melancholy";
  } else if (cloud > 70) {
    return "Contemplative";
  } else if (temp > 80) {
    return "Energetic";
  } else if (temp < 40) {
    return "Calm";
  } else {
    return "Neutral";
  }
}

function drawEmotionEffect(emotion, time) {
  switch (emotion) {
    case "Melancholy":
      drawRainEffect();
      break;
    case "Contemplative":
      drawCloudOverlay();
      break;
    case "Energetic":
      drawSunburst();
      break;
    case "Calm":
      drawSoftBlueWave();
      break;
    case "Neutral":
      drawGentleGlow();
      break;
  }

  // Add rotating ring of circles that changes color based on time of day
  drawRotatingRing(time);
}

function drawRainEffect() {
  for (let i = 0; i < 200; i++) {
    stroke(150, 150, 255, 100);
    line(random(width), random(height), random(width), random(height) + 10);
  }
}

function drawCloudOverlay() {
  noStroke();
  fill(200, 200, 200, 90);
  ellipse(width / 2, height / 2, 600, 300);
}

function drawSunburst() {
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 360; i += 15) {
    stroke(255, 180, 0, 150);
    line(0, 0, 300 * cos(radians(i)), 300 * sin(radians(i)));
  }
  pop();
}

function drawSoftBlueWave() {
  noFill();
  stroke(100, 200, 255, 150);
  strokeWeight(2);
  for (let y = 0; y < height; y += 20) {
    beginShape();
    for (let x = 0; x < width; x += 10) {
      vertex(x, y + sin(x * 0.01 + frameCount * 0.05) * 10);
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

  // Color transition factor (t) based on time of day
  let t;
  if (timeOfDay >= 6 && timeOfDay <= 18) {
    t = map(timeOfDay, 6, 18, 0, 1); // Morning to evening
  } else if (timeOfDay > 18) {
    t = map(timeOfDay, 18, 24, 1, 0); // Evening to night
  } else {
    t = map(timeOfDay, 0, 6, 1, 0); // Night to morning
  }

  // Define day and night colors
  let nightColor = color(75, 0, 130);     // Indigo
  let dayColor = color(255, 255, 200);    // Cream
  let baseColor = lerpColor(nightColor, dayColor, t);

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
