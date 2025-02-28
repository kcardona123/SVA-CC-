class Rect extends Shape{
    constructor(world, pos, size, option) {
        super(world, pos, size, option);
    }

    createBody() {
        return Matter.Bodies.rectangle(
            this.pos.x, this.pos.y,
            this.size.x, this.size.y
        );
    }

    displayShape() {
        rect(0,0,this.size.x, this.size.y);
    }
}