class Station {
    constructor(data) {
        this.isValid = true;
        this.id = data.id;
        const x = map(data.lng, minLng, maxLng, width, 0);
        const y = map(data.lat, minLat, maxLat, height, 0);
        this.pos = createVector(x, y);

        if (x > width || y > height) {
            this.isValid = false;
        }
    }

    getPos() {
        return this.pos.copy();
    }

    display() {
        if (this.isValid) {
            noStroke();
            fill(100);
            circle(this.pos.x, this.pos.y, 5);
        }
    }
}