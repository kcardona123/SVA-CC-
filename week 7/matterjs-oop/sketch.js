let engine;
let shapes = [];


function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    engine = Matter.Engine.create();
    let ground = Matter.Bodies.rectangle(
        width / 2, height, width * 1.25, 25, { isStatic: true }
    );
    Matter.Composite.add(engine.world, ground);

}

function draw() {
    background(190);
    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        shape.display();
    }
    Matter.Engine.update(engine, 1000 / 30);
}

function addShape(x, y) {
    let shape;
    if (random() > 0.5) {
        shape = new Circle(engine.world,
            createVector(x, y),
            createVector(random(20, 60), 0),
            {}
        );
    } else {
        shape = new Rect(engine.world,
            createVector(x, y),
            createVector(random(20, 60), random(20, 60)),
            {}
        );
    }

    Matter.Composite.add(engine.world, shape);
    shapes.push(shape);

}
function mousePressed() {
    addShape(mouseX, mouseY);
}