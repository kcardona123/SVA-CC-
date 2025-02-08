let img;
let imgAspect; // Store aspect ratio

function preload() {
  img = loadImage('VitalLogo.png'); 
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight); // Create canvas
    canvas.parent(document.body); //  <body> to apply CSS
  
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
