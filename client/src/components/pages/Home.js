import React, { Component } from "react";
import "./Home.css";
import arrow from "../../assets/arrow.svg";
import { navigate, Router } from "@reach/router";
import Navbar from "../modules/Navbar";
import PetState from "../modules/PetState.js"
import { get } from "../../utilities";
import moment from "moment"; 


class Home extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        user: undefined, 
        petState: 0, 
        navdisplay: false, 
      };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ user: user }));
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

  handleButtonClick = () => {
    this.setState({ navdisplay: !this.state.navdisplay });
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
      <Navbar handleLogout={this.props.handleLogout} userId={this.props.userId} user={this.props.user}/>
      <div className="home-background">
        <div className="home-content">
          <button className = "reflect-button" onClick={() => navigate('/newentry')}>reflect</button>
          <p id="date">{moment().format("MM/DD/YYYY")}</p>
        </div>
        <svg viewBox="0 0 200 50" id = "ellipse-viewbox" xmlns="http://www.w3.org/2000/svg">
          <ellipse id="home-ellipse" cx="100" cy="50" rx="150" ry="20"/>
        </svg>
      </div>
      <PetState petState={this.state.petState} userId={this.props.userId}/>

      </>
    );
  }
}

export default Home;
