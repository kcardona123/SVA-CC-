class Ball {
    constructor(x, y, vx, vy) {
        this.body = Matter.Bodies.circle(x, y, 20);
        Matter.Body.setVelocity(this.body, { x: vx, y: vy });
        Matter.World.add(world, this.body);
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.body.position.x, this.body.position.y, 40);
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.body.position.x, this.body.position.y);
        return d < 20;
    }

    offScreen() {
        return this.body.position.y > height;
    }

    removeFromWorld() {
        Matter.World.remove(world, this.body);
    }
}