import React, { Component } from "react";
import "./Home.css";
import doggo from "../../assets/dog_normal.svg";

class Home extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
      <div className="home-background">
        <div className="home-content">
          <button className = "reflect-button">reflect</button>
          <p id="date">01/15/2021</p>
        </div>

        <svg viewBox="0 0 200 50" id = "ellipse-viewbox" xmlns="http://www.w3.org/2000/svg">
          <ellipse id="home-ellipse" cx="100" cy="50" rx="150" ry="20"/>
        </svg>
        <img src={doggo} className="pet-image"/>
      
        
      </div>
      </>
    );
  }
}

export default Home;
