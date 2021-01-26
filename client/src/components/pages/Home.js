import React, { Component } from "react";
import "./Home.css";
import { navigate, Router } from "@reach/router";
import Navbar from "../modules/Navbar";
import PetState from "../modules/PetState.js"
import { get } from "../../utilities";
import moment from "moment"; 
import Footer from "../modules/Footer.js";

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
    const dayBefore = {timestamp: moment().local().subtract(1, 'days').startOf('day')};
    const dayNow = {timestamp: moment().local().startOf('day')};

    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ user: user}));
    get("/api/journalentrieschanged", dayBefore).then((entryBefore) => {
      if(entryBefore.entries){
        this.setState({
          petState: 1,
        }, () => { get("/api/journalentrieschanged", dayNow).then((entryObjs) => {
          if (entryObjs.entries) {
            this.setState({
              petState:2, 
              });
            } 
        });});
      }else{
        console.log("am i here");
        this.setState({
          petState: 0,
        }, () => { get("/api/journalentrieschanged", dayNow ).then((entryObjs) => {
          console.log("ahhhh");
          if (entryObjs.entries) {
            console.log("hellooo");
            this.setState({
              petState: 1, 
              });
            } 
        });});
      }
    });
    }

  incrementPetState = () => {
    if(this.state.petState<2){
    this.setState({
      petState: this.state.petState + 1,
    });
  }
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
      <Footer/>
      </>
    );
  }
}

export default Home;
