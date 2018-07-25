import React, { Component } from 'react';
import logo from '../images/icons/mc-logo.png';
import '../App.css';
import Searchinput from '../Components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
        </header>
        <div className="container">
         <Searchinput />
        </div>   
      </div>
    );
  }
}

export default App;
