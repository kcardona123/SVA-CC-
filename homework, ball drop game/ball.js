class Ball {
    constructor(x, y, vx) {
        this.r = 20; // Base radius
        this.body = Matter.Bodies.circle(x, y, this.r, { restitution: 0.6 });
        Matter.Body.setVelocity(this.body, { x: vx, y: 3 });
        Matter.World.add(world, this.body);
        
        // Create a smoother irregular shape
        this.shape = this.createSmoothIrregularShape();
    }

    createSmoothIrregularShape() {
        let vertices = [];
        let numVertices = 12;  // Number of vertices (smooth out with more vertices)
        
        // Create the vertices with subtle random variations
        for (let i = 0; i < numVertices; i++) {
            let angle = map(i, 0, numVertices, 0, TWO_PI);
            // Slight variation in the radius to keep it smoother
            let distance = this.r + random(-2, 2);  // Small variation for smoothness
            let x = distance * cos(angle);
            let y = distance * sin(angle);
            vertices.push(createVector(x, y));
        }
        
        return vertices;
    }

    update() {
        // Ball movement handled by physics engine
    }

    display() {
        let pos = this.body.position;

        // Set a grayish color for the asteroids
        fill(169, 169, 169); // Light grayish color
        noStroke();
        
        // Draw the smooth irregular asteroid shape
        beginShape();
        for (let v of this.shape) {
            vertex(pos.x + v.x, pos.y + v.y);
        }
        endShape(CLOSE);
    }

    isOffScreen() {
        return this.body.position.y > height + this.r;
    }

    clicked(px, py) {
        let d = dist(px, py, this.body.position.x, this.body.position.y);
        return d < this.r;
    }
}
