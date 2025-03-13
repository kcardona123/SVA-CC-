class Ball {
    constructor(x, y, vx, vy) {
        this.r = 20;
        this.body = Matter.Bodies.circle(x, y, this.r, { restitution: 0.6 });
        Matter.Body.setVelocity(this.body, { x: vx, y: vy });
        Matter.World.add(world, this.body);
    }

    update() {
        // Ball movement handled by physics engine
    }

    display() {
        let pos = this.body.position;
        fill(255);
        noStroke();
        ellipse(pos.x, pos.y, this.r * 2);
    }

    isOffScreen() {
        return this.body.position.y > height + this.r;
    }

    clicked(px, py) {
        let d = dist(px, py, this.body.position.x, this.body.position.y);
        return d < this.r;
    }
}
