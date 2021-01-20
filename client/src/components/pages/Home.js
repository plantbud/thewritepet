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
      };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    console.log(moment().format("MM/DD/YYYY"));
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
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
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
      <Navbar handleLogout={this.handleLogout} userId={this.props.userId}/>

      <div className="home-background">
        <div className="home-content">
          <div className="name-display" >
            <span >{this.state.user.name}</span>
            <img src={arrow} className="arrowdown"/>
          </div>
          <button className = "reflect-button" onClick={() => navigate('/newentry')}>reflect</button>
          <p id="date">{moment().format("MM/DD/YYYY")}</p>
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
