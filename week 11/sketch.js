let data;
let maxLat = -10000;
let minLat = 10000;
let maxLng = -10000;
let minLng = 10000;
let stations = [];
let trips = [];
let currentTime;
let maxTime;

function preload() {
    data = loadJSON('data/2023-11-06.json');
}

function setup () {
    createCanvas(700, 700);
    data.stations.forEach( s => {
        if (maxLat < s.lat) {
            maxLat = s.lat;
        }
        if (maxLng < s.lng) {
            maxLng = s.lng;
        }
        if (minLat > s.lat) {
            minLat = s.lat;
        }
        if (minLng > s.lng) {
            minLng = s.lng;
        }
    });

    data.stations.forEach( s => {
        const station = new Station(s);
        stations.push(station);
    });

    data.trips.forEach( t => {
        const trip = new Trip(t);
        if (trip.isValid) {
            trips.push(trip);
        }
    });

    currentTime = trips[0].startTime;
    maxTime = trips[trips.length - 1].endTime;
}

function draw () {
    if (currentTime < maxTime) {
        currentTime += 50000;
    }
    background(190);
    stations.forEach(s => s.display());
    trips.forEach(t => t.display(currentTime));

    fill(0);
    textSize(18);
    const time = new Date(currentTime);
    text(time.toString(), 50, 50);
}

 