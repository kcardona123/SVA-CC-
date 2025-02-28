class Shape {
    constructor(world, pos, size, option) {
        this.world = world; 
        this.pos = pos.copy();
        this.size = size.copy();
        this.option = option;
        this.body = this.createBody();
        Matter.Composite.add(this.world, this.body);
    }

    createBody() {
// abstract function
    }

    display () {
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        this.displayShape();
        pop();

    }

    displayShape() {
        // abstract function
    }
    
}