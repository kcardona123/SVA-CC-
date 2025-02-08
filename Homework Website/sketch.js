let img;
let imgAspect; // Store aspect ratio

function preload() {
  img = loadImage('VitalLogo.png'); 
}

function setup() {
    let canvas = createCanvas(windowWidth, 500); // Create canvas
    let body = document.querySelector('body');
        body.insertBefore(canvas.canvas, body.firstChild);
  
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
