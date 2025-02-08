let img;
let imgAspect; // Store aspect ratio

function preload() {
  img = loadImage('VitalLogo.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgAspect = img.height / img.width; // Calculate aspect ratio
}

function draw() {
  let scaledHeight = windowWidth * imgAspect; // Maintain proportion

  // Draw image centered vertically
  image(img, 0, 0, windowWidth, scaledHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
