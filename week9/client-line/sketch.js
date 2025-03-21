let ws;

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(190);

    ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
        console.log(event.data);
        onMessage(event.data);
    }        
    
}

function onMessage(data) {
    const json = JSON.parse(data);
    line(json.px, json.py, json.x, json.y)
    
}
function mousePressed() {
    sendData();
}

function mouseDragged() {
    sendData();
}

function sendData(){
    const data = {
        "px": pmouseX,
        "py": pmouseY,
        "x": mouseX, 
        "y": mouseY
    }

    ws.send(JSON.stringify(data));
}