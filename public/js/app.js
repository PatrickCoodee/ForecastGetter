// get element
const locationUI = document.querySelector('#loc-search')

const formUI = document.querySelector('.forcast-form')

const loading = document.querySelector('.loading')

loading.style.display = 'none'

formUI.addEventListener('submit', (e) => {
  e.preventDefault()

  // check if location is provided
  if (locationUI.value === '') {
    // remove error if there is error
    clearError()
    showError('Please provide a location')
  } else {
    // show loading gif
    showLoading()
    // call fetch method to get the data
    fetchForecast(locationUI.value)
      .then(({ success, data }) => {
        // clear input
        clearInput()
        // check if successful fetch
        if (success) {
          hideLoading()
          showForecast(data)
        } else {
          hideLoading()
          showError(data)
        }
      })
      .catch((err) => {
        // showError('Error connecting to the api service')
        hideLoading()
        clearInput()
      })
  }
})

const clearError = () => {
  if (document.querySelector('.alert-error')) {
    document.querySelector('.alert-error').remove()
  }
}

const showError = (message) => {
  // create an error div
  const div = document.createElement('div')

  div.className = 'alert-error'

  div.appendChild(document.createTextNode(message))

  // insert error div before input
  formUI.insertBefore(div, locationUI)

  // clear error message after 3 seconds
  setTimeout(clearError, 3000)
}

const fetchForecast = async (location) => {
  const data = await fetch(
    `http://localhost:3000/weather?address=${location}`
  )

  const JSONdata = await data.json()
  console.log(JSONdata)
  return JSONdata
}

// show forecast to UI
const showForecast = ({ address, forecast, location }) => {
  // remove loading
  loading.style.display = 'none'
  // clear result
  clearResult()
  // create a list
  const forecastList = document.createElement('ul')

  // append data to list
  forecastList.innerHTML = `
    <li class="forecast-item">FORECAST:${forecast}</li>
    <li class="forecast-item">ADDRESS:${address}</li>
    <li class="forecast-item">LOCATION:${location}</li>
  `

  // add to UI parent
  document
    .querySelector('.forecast')
    .appendChild(forecastList)
}

const clearInput = () => {
  locationUI.value = ''
}

const clearResult = () => {
  document.querySelector('.forecast').innerHTML = ''
}

const showLoading = () => {
  loading.style.display = 'block'
}

const hideLoading = () => {
  loading.style.display = 'none'
}
