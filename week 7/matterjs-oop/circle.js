class Circle extends Shape{
    constructor(world, pos, size, option) {
        super(world, pos, size, option);
    }

    createBody() {
        return Matter.Bodies.circle(
            this.pos.x, this.pos.y, 
            this.size.x/2, 
        );
    }

    displayShape() {
        circle(0,0,this.size.x);
    }
}