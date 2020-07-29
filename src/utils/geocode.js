const request = require('request')

class Geocode {
  constructor() {
    this.token =
      'pk.eyJ1IjoicGNuYXZhcnJvIiwiYSI6ImNrY2J1eDQwejI5MGUycnRpZjhiaWxzZmoifQ.A16dV2UNJCNVEMWVq4T-bA'
    this.url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  }

  getGeocode = (location, callback) => {
    location = encodeURIComponent(location)
    const url = `${this.url}${location}.json?access_token=${this.token}&limit=1`
    request({ url: url, json: true }, (err, data) => {
      if (err) {
        callback(
          'Unable to connect to the api service',
          undefined
        )
      } else if (data.body.features.length === 0) {
        callback(
          'Unable to find location, try another search',
          undefined
        )
      } else {
        const location = {
          latitude: data.body.features[0].center[1],
          longitude: data.body.features[0].center[0],
          place_name: data.body.features[0].place_name,
        }
        callback(undefined, location)
      }
    })
  }
}
const geocode = new Geocode()

module.exports = geocode.getGeocode
