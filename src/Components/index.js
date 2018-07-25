import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          weatherInfo: [], 
          text: props.text, 
          weather: '',
          item: '', 
          locations: [],
          location_id: [],
          search_hint: props.search_hint,
          handleOnInputHover: props.handleOnInputHover,
          handleWeatherInfo: props.handleWeatherInfo, 
          imgSrc: require('../images/icons/Showers.svg'),
          imageSrc: require('../images/icons/windarrow.svg')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOnInputHover = this.handleOnInputHover.bind(this);
        this.handleOnInputEnter = this.handleOnInputEnter.bind(this);
        this.handleSearchhint = this.handleSearchhint.bind(this);
        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleSubmitRequesttype = this.handleSubmitRequesttype.bind(this);
    }

    handleOnInputHover(){
      this.setState({
        handleOnInputHover: false,
        search_hint: false
      });
    }
    handleOnInputEnter(){
      this.setState({
        handleOnInputEnter: true
      });
    }

    handleSearchhint(){
      this.setState({
        search_hint: true
      });
    }

    handleChange(e) {
        this.setState({ 
          text: e.target.value,
          handleOnInputHover: true,
          search_hint: true,
          handleSearchhintleave: false,
          handleWeatherInfo: false  });
        axios.get(`http://proxy.aw.ee:3001/location?query=`+ this.state.text)
        .then(response => {
          const locations = response.data;
          this.setState({ locations });
        })
      }
      
    handleSubmitRequest() {     
        this.setState({ handleWeatherInfo: true })

        axios.get('http://proxy.aw.ee:3001/location?query='+ this.state.text) 
        .then(response => {
            const location_id = response.data[0].woeid;
            this.setState({ location_id: location_id});
            axios.get(`http://proxy.aw.ee:3001/location/`+ location_id)
            .then(response => {
                const weatherInfo = response.data;
                this.setState({ weatherInfo: weatherInfo.consolidated_weather});  
                console.log("Weather Info", weatherInfo);  
            })
        })         
    }       
      
    handleSubmitRequesttype(event) {
        if(event.key === 'Enter') {            
                this.handleSubmitRequest()
                this.handleOnInputHover()
        }
  }
  handleOnClick(event) {
    this.setState({ text: event.title});
    this.handleOnInputHover();
    this.handleSubmitRequest();
  }
  handleWeatherIcon(){
    console.log("Weather Icon", this.state.weather)
  }

    
  render() {
    return (
      <div>
          <div 
             onMouseLeave={this.handleOnInputHover} 
             onMouseEnter={this.handleSearchhint}  
             onClick={this.handleSearchhint} 
             >   
            <div> 
            {this.state.search_hint && <span className="search_hint"> Search location...</span>} </div>
            <input 
              className="user_input" 
              placeholder="Search location..." 
              onChange={this.handleChange}
              value={this.state.text}   
              onMouseEnter={this.handleOnInputEnter}  
              onClick={this.handleOnInputEnter}   
              onKeyPress={this.handleSubmitRequesttype}   
              name="search"
              list="location"
              type="text" 
              autoComplete="off"/>  
              <div 
              className="dropdown"
              >                    
             { this.state.handleOnInputHover &&  
             <ul id="location" className="dropdown-list">
                {this.state.locations.map((item) =>
                        <li key={item.woeid}  
                        value={item}                  
                        onClick={this.handleOnClick.bind(this,item)}      
                        className="location_list"
                        > {item.title}</li>
                    )}
            </ul>  }

             { this.state.handleWeatherInfo && <ul className="weatherDropdown">
                {this.state.weatherInfo.map((weather) =>
                    <li key={weather.id}  
                    value={weather}                      
                    className="weather_list"
                    > 
                        <h2 className="header"> Today </h2>  
                        <p> <img src={this.state.imgSrc} alt="WeatherIcon" height="22" width="22" onLoad={this.handleWeatherIcon.bind(this,weather)}/>
                        {weather.weather_state_name} </p>
                        <p className="weather_prop"> Max: {weather.max_temp}°C </p>
                        <p className="weather_prop"> Min:{weather.min_temp}°C</p>
                        <p className="weather_prop"> <img src={this.state.imageSrc} alt="WeatherIcon" height="12" width="12" classname="weather_icon"onLoad={this.handleWeatherIcon.bind(this,weather)}/> {weather.wind_speed} mph </p>
                        {/* <p className="weather_prop"> Applicable date: {weather.applicable_date} </p> */}
                        </li>
                      )}
             </ul> }
              </div>                       
        </div>
      </div>
    )
  }
}
export default index;