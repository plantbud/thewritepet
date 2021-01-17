import React, { Component } from "react";
import "./Home.css";
import doggo from "../../assets/dog_normal.svg";
import arrow from "../../assets/arrow.svg";
import { navigate, Router } from "@reach/router";
import Navbar from "../modules/Navbar";




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
              <Navbar

        />
      <div className="home-background">
        <div className="home-content">
          <div className="name-display" >
            <span >Jessica Xu</span>
            <img src={arrow} className="arrowdown"/>
          </div>

          <button className = "reflect-button" onClick={() => navigate('/newentry')}>reflect</button>
          <p id="date">01/15/2021</p>
        </div>
        <div className= "container"> </div>

        <svg viewBox="0 0 200 50" id = "ellipse-viewbox" xmlns="http://www.w3.org/2000/svg">
          <ellipse id="home-ellipse" cx="100" cy="50" rx="150" ry="20"/>
        </svg>
        
        
      
        
      </div>
      </>
    );
  }
}

export default Home;
