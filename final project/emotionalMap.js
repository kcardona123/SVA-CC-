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

function drawEmotionEffect(emotion) {
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
