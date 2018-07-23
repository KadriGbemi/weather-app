import React, { Component } from 'react';
import logo from '../images/icons/mc-logo.png';
import '../App.css';
import Search_Input from '../Components/Search_Input';

class App extends Component {
  render() {
    return (
      <div className="App">
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
        </header>
        <div className="container">
         <Search_Input />
        </div>   
        
      </div>
    );
  }
}

export default App;
