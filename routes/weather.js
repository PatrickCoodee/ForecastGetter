const express = require('express')
const router = express.Router()
const Geocode = require('../src/utils/geocode')
const Forecast = require('../src/utils/forecast')
// set routers

router.get('/', (req, res) => {
  // rendering from the views folder using hbs
  res.render('index', { name: 'Patrick' })
})

router.get('/about', (req, res) => {
  res.render('about', {
    person: {
      name: 'Patrick Navarro',
    },
  })
})

router.get('/help', (req, res) => {
  res.render('help', {
    info: {
      text: 'This is a course that will boost my knowledge',
      day: 'day 9',
    },
    title: 'Help Page',
  })
})

//* API for getting weather data
router.get('/weather', (req, res) => {
  const address = req.query.address
  //! check if requered params is passed
  if (!address) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an address',
    })
  }

  Geocode(
    address,
    (err, { latitude, longitude, place_name } = {}) => {
      if (err) {
        return res.status(200).json({
          success: false,
          data: err,
        })
      }
      Forecast(latitude, longitude, (err, forecast) => {
        if (err) {
          return res.status(200).json({
            success: false,
            data: err,
          })
        }

        res.status(200).json({
          success: true,
          data: {
            forecast,
            location: place_name,
            address,
          },
        })
      })
    }
  )
})

//*API for sending product samples
router.get('/products', (req, res) => {
  //* print query strings passed from the browser
  console.log(req.query.rating)
  res.status(200).json({
    success: true,
    data: [],
  })
})

//! rending 404 page for the following request to forward / help
router.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article Page Not found',
    message: 'Help Article not found',
  })
})

// export router
module.exports = router
