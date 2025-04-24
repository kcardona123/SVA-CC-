let weatherData;
let emotionalStates = [];
let currentIndex = 0;
let manhattanMap;

let scrubX = 0;
let isScrubbing = false;
let startTime;

let gTime = 0;
let sinTime = 0;
let prevHour = -1;
let isPaused = false;

let currentEmotion = "";
let gcolor = 'rgb(0, 0, 0)'

function preload() {
  manhattanMap = loadImage('manhattanMap.png');

  let url = "https://archive-api.open-meteo.com/v1/archive?latitude=40.7834&longitude=-73.9663&start_date=2024-01-01&end_date=2024-12-31&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";

  weatherData = loadJSON(url);
}

function setup() {
  createCanvas(1000, 600);
  processWeatherData();
  frameRate(60);
  startTime = millis();
}

function draw() {
  background(0);
  gTime += 1/frameRate();
  sinTime = sin(gTime * Math.PI);
  image(manhattanMap, 0, 0, width, height);
  drawVignette();

  if (!isScrubbing && !isPaused) {
    updateCurrentIndexLive();
  }

  if (emotionalStates.length > 0) {
    let state = emotionalStates[currentIndex];
    
    if (currentEmotion !== state.emotion[0]) {
      console.log("switchEmotion",currentEmotion )
      currentEmotion = state.emotion[0];
      switchEmotion(currentEmotion);
    }
    drawEmotionEffect(state.emotion, state.time);
    drawTopRightLabel(state);
    drawCenteredTime(state.time);
  }

  drawScrubber();
}



function updateCurrentIndexLive() {
  let secondsPassed = (millis() - startTime) / 1000.0;
  let newIndex = floor(secondsPassed);
  currentIndex = min(newIndex, emotionalStates.length - 1);
}

function processWeatherData() {
  let temp = weatherData.hourly.temperature_2m;
  let apparentTemp = weatherData.hourly.apparent_temperature;
  let precip = weatherData.hourly.precipitation;
  let humidity = weatherData.hourly.relative_humidity_2m;
  let cloud = weatherData.hourly.cloud_cover;
  let time = weatherData.hourly.time;

  for (let i = 0; i < temp.length; i += 6) {
    let timestamp = time[i];
    let dateOnly = timestamp.split("T")[0];

    if (dateOnly >= "2024-01-01") {
      let emotion = mapWeatherToEmotion(temp[i], precip[i], cloud[i]);
      emotionalStates.push({
        index: i,
        temp: temp[i],
        apparentTemp: apparentTemp[i],
        precip: precip[i],
        humidity: humidity[i],
        cloud: cloud[i],
        time: time[i],
        emotion: emotion
      });
    }
  }
}

function formatDateTime(timestamp) {
  let [date, time] = timestamp.split("T");
  return `${date} ${time.slice(0, 5)}`;
}

// NEW: Clean Top Right Info Box
function drawTopRightLabel(state) {
  let boxWidth = 340;
  let boxHeight = 130; // increased height for multi-line emotion
  let x = width - boxWidth - 10;
  let y = 10;

  fill(0, 180);
  rect(x, y, boxWidth, boxHeight, 10);

  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);

  let lineHeight = 20;
  let leftColX = x + 10;
  let rightColX = x + boxWidth / 2;

  // Draw other info
  text(`Temp: ${state.temp}°F`, leftColX, y + 10);
  text(`Apparent: ${state.apparentTemp}°F`, rightColX, y + 10);
  text(`Precip: ${state.precip} in`, leftColX, y + 10 + lineHeight);
  text(`Cloud Cover: ${state.cloud}%`, rightColX, y + 10 + lineHeight);
  text(`Humidity: ${state.humidity}%`, leftColX, y + 10 + lineHeight * 2);

  // Emotion(s)
  let emotionList = typeof state.emotion === "string"
    ? state.emotion.split(",").map(e => e.trim())
    : state.emotion;

  text(`Emotion:`, rightColX, y + 10 + lineHeight * 2);

  for (let i = 0; i < emotionList.length; i++) {
    text(emotionList[i], rightColX + 10, y + 10 + lineHeight * (3 + i));
  }
}


// NEW: Centered Time & Date above scrubber
function drawCenteredTime(timestamp) {
  let dateTime = formatDateTime(timestamp);
  push();
  fill(255);
  textFont('Arial');
  textSize(24);
  noStroke();
  textAlign(CENTER, BOTTOM);
  text(dateTime, width / 2, height - 40);
  pop();
}

function drawScrubber() {
  let margin = 50;
  let y = height - 25;
  let barWidth = width - margin * 2;

  stroke(255);
  strokeWeight(2);
  line(margin, y, width - margin, y);

  scrubX = map(currentIndex, 0, emotionalStates.length - 1, margin, width - margin);
  fill(255);
  noStroke();
  ellipse(scrubX, y, 12, 12);
}

function mousePressed() {
  if (mouseY > height - 40 && mouseY < height - 10) {
    isScrubbing = true;
    updateScrub(mouseX);
  }
}

function mouseDragged() {
  if (isScrubbing) {
    updateScrub(mouseX);
  }
}

function mouseReleased() {
  isScrubbing = false;
  startTime = millis() - currentIndex * 1000;
}

function updateScrub(x) {
  let margin = 50;
  let scrubWidth = width - margin * 2;
  scrubX = constrain(x, margin, width - margin);
  let t = map(scrubX, margin, width - margin, 0, emotionalStates.length - 1);
  currentIndex = floor(t);
}

function drawVignette() {
  // Use native canvas context for gradient
  let ctx = drawingContext; // alias for canvas.getContext("2d")
  let radius = Math.max(width, height) * 0.75;

  // Create radial gradient
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, radius * 0.3,  // inner circle (center, inner radius)
    width / 2, height / 2, radius         // outer circle (center, outer radius)
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, gcolor);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  } 
}