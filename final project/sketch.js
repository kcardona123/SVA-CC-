let weatherData;
let emotionalStates = [];
let currentIndex = 0;
let manhattanMap;
let interval = 60;

let scrubX = 0;
let isScrubbing = false;

function preload() {
  manhattanMap = loadImage('manhattanMap.png');

  // Updated API link for historical data in 2024
  let url = "https://archive-api.open-meteo.com/v1/archive?latitude=40.7834&longitude=-73.9663&start_date=2024-01-01&end_date=2024-12-31&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";
  
  weatherData = loadJSON(url);
}

function setup() {
  createCanvas(1000, 600);
  processWeatherData();
  frameRate(60);
}

function draw() {
  background(0);
  image(manhattanMap, 0, 0, width, height);

  if (emotionalStates.length > 0) {
    let state = emotionalStates[currentIndex];
    drawEmotionEffect(state.emotion);
    drawLabel(state);
  }

  drawScrubber();

  if (!isScrubbing && frameCount % interval === 0) {
    currentIndex = (currentIndex + 1) % emotionalStates.length;
  }
}

function processWeatherData() {
  let temp = weatherData.hourly.temperature_2m;
  let apparentTemp = weatherData.hourly.apparent_temperature;
  let precip = weatherData.hourly.precipitation;
  let humidity = weatherData.hourly.relative_humidity_2m;
  let cloud = weatherData.hourly.cloud_cover;
  let time = weatherData.hourly.time;

  // Loop through every 6th data point (assuming hourly data)
  for (let i = 0; i < temp.length; i += 6) {
    let timestamp = time[i];
    let dateOnly = timestamp.split("T")[0];

    // Now includes data from January 1st, 2024
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
  return `${date} ${time.slice(0, 5)}`; // e.g., 2024-01-01 13:00
}

function drawLabel(state) {
  fill(0, 180);
  rect(10, 10, 360, 80, 10);

  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`Time: ${formatDateTime(state.time)}`, 20, 20);
  text(`Temp: ${state.temp}°F`, 20, 40);
  text(`Apparent Temp: ${state.apparentTemp}°F`, 140, 40);
  text(`Precip: ${state.precip} in`, 240, 40);
  text(`Clouds: ${state.cloud}%`, 20, 60);
  text(`Humidity: ${state.humidity}%`, 140, 60);
  text(`Emotion: ${state.emotion}`, 240, 60);
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
}

function updateScrub(x) {
  let margin = 50;
  let scrubWidth = width - margin * 2;
  scrubX = constrain(x, margin, width - margin);
  let t = map(scrubX, margin, width - margin, 0, emotionalStates.length - 1);
  currentIndex = floor(t);
}
