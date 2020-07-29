const express = require('express')
const dotenv = require('dotenv')
const weather = require('../routes/weather')
const path = require('path')
//* load in hbs to register partials
const hbs = require('hbs')

// init server
const app = express()

//* optional {alter express view engine files live}
const viewLocation = path.join(
  __dirname,
  '../templates/views'
)
const partials = path.join(
  __dirname,
  '../templates/partials'
)

//* setup view engine to handlebars
app.set('view engine', 'hbs')
//? making express to look for views to set location
app.set('views', viewLocation)

//register partials
hbs.registerPartials(partials)

//*for loading css and js files
const staticFiles = path.join(__dirname, '../public')

//* load config
dotenv.config({ path: '../config/config' })

//* loading static files {css and js}
app.use(express.static(staticFiles))

//* use routes for weather
app.use('', weather)

//! rendering 404 pages
app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page Not found',
    message: 'page not found',
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
