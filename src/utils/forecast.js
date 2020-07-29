const request = require('request')

class Forecast {
  constructor() {
    this.url = 'https://api.darksky.net/forecast'
    this.key = 'e39e1474860a66cf454edf5d58290401'
  }

  getForecast = (latitude, longitude, callback) => {
    const url = `${this.url}/${this.key}/${latitude},${longitude}`

    request({ url: url, json: true }, (err, data) => {
      if (err) {
        callback(
          'Cannot connect to DarkSky API service',
          undefined
        )
      } else if (data.body.error) {
        callback(
          'Poorly formatted request, Please try again',
          undefined
        )
      } else {
        callback(
          undefined,
          `${data.body.currently.summary}, It is currently ${data.body.currently.temperature}. There is ${data.body.currently.precipProbability}% chance of rain`
        )
      }
    })
  }
}

const forecast = new Forecast()

module.exports = forecast.getForecast
