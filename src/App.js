import React, { Component } from 'react'
import axios from 'axios'
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = '03bf9d8201615f6e538f328c07043d69'

class App extends Component {
  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }
  getWeather = async e => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      )

      const { main, sys, weather, name } = data

      this.setState({
        temperature: main.temp,
        city: name,
        country: sys.country,
        humidity: main.humidity,
        description: weather[0].description,
        error: ''
      })
    } catch (error) {
      this.setState({
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please enter the valid values.'
      })
    }
  }
  render() {
    const {
      temperature,
      city,
      country,
      humidity,
      description,
      error
    } = this.state

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-5 title-container">
                  <Titles />
                </div>
                <div className="col-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={temperature}
                    humidity={humidity}
                    city={city}
                    country={country}
                    description={description}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
