import React, { Component } from 'react'
import '../App.css';

class Search_Input extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div>
          <input 
            className="user_input" 
            placeholder="Search location..." 
            name="search"/>  
      </div>
    )
  }
}
export default Search_Input;