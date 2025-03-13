function displayUI() {
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 10, 40);
    text(`Lives: ${lives}`, width - 80, 40);
}

function drawStartScreen() {
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Click to Start", width / 2, height / 2);
}
