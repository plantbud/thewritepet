import React, { Component } from "react";
import "./Home.css";
import arrow from "../../assets/arrow.svg";
import { navigate, Router } from "@reach/router";
import Navbar from "../modules/Navbar";
import HomeButton from "../modules/HomeButton";
import PetState from "../modules/PetState.js"


class Home extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        user: undefined, 
        petState: 0, 
      };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }
  incrementPetState = () => {
    this.setState({
      petState: this.state.petState + 1,
    });
  };
  decreasePetState = () => {
    if(this.state.petState>0){
      this.setState({
        petState: this.state.petState - 1,
      });
    } 
  };

  render() {
    return (
      <>
      <div className="con">
      <button className="cons" onClick={() => {
          this.incrementPetState();
          }}> Increase Consistency </button>
          <button className="cons" onClick={() => {
          this.decreasePetState();
          }}> Decrease Consistency </button>
      </div>

          <PetState petState={this.state.petState}/>

      <Navbar/>
      <HomeButton />
      <div className="home-background">
        <div className="home-content">
          <div className="name-display" >
            <span >Jessica Xu</span>
            <img src={arrow} className="arrowdown"/>
          </div>
          <button className = "reflect-button" onClick={() => navigate('/newentry')}>reflect</button>
          <p id="date">01/15/2021</p>
        </div>
        <svg viewBox="0 0 200 50" id = "ellipse-viewbox" xmlns="http://www.w3.org/2000/svg">
          <ellipse id="home-ellipse" cx="100" cy="50" rx="150" ry="20"/>
        </svg>
      </div>
      </>
    );
  }
}

export default Home;
