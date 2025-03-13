function displayUI() {
    fill(0);
    textSize(20);
    textAlign(RIGHT);
    text(`Lives: ${lives}`, width - 20, 30);
    text(`Score: ${score}`, width - 20, 60);
}

class StartButton {
    constructor() {
        this.x = width / 2 - 75;
        this.y = height / 2 - 25;
        this.w = 150;
        this.h = 50;
    }

    display() {
        fill(0);
        rect(this.x, this.y, this.w, this.h, 10);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Click to Start", this.x + this.w / 2, this.y + this.h / 2);
    }

    checkClick() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            game.startGame(); // Now correctly starts the game
        }
    }
}
