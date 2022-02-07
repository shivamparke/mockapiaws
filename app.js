"use strict"

// Already returns token but just for PR requirement!

let express = require('express')
let app = express()

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')

app.get('/data/2.5/weather', get_weather)

function get_weather(request, response) {
    response.json({
  "coord": {
    "lon": -123.262,
    "lat": 44.5646
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 45.14,
    "feels_like": 43.48,
    "temp_min": 37.87,
    "temp_max": 56.34,
    "pressure": 1020,
    "humidity": 72,
    "sea_level": 1020,
    "grnd_level": 1012
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.74,
    "deg": 24,
    "gust": 5.93
  },
  "clouds": {
    "all": 44
  },
  "dt": 1642373258,
  "sys": {
    "type": 1,
    "id": 5858,
    "country": "US",
    "sunrise": 1642347934,
    "sunset": 1642381185
  },
  "timezone": -28800,
  "id": 5720727,
  "name": "Corvallis",
  "cod": 200
})
}
