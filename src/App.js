import React, { Component } from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_Key = "9837b3f52748991f7e21fb78e5f73322";
class App extends Component {

  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_Key}`)
      const data = await api_call.json()

     this.setState({
       temperature: data.main.temp,
       city: data.name,
       country: data.sys.country,
       humidity: data.main.humidity,
       description: data.weather[0].description,
       error: ""
     })

   } else {
    this.setState({
      temperature:"",
      city: "",
      country: "",
      humidity: "",
      description: "",
      error: "Please enter the values"
   })
  }
}

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                  <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   );
  }
};

export default App
