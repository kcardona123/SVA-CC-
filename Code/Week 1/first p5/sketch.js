let btn;
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);

    btn = select('#my-button');
    btn.mouseClicked(onBtnClicked);

  }

  function onBtnClicked(){
    fill(random(255));
  }

  function draw() {
    background(220);
    rect(100,100,100);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }