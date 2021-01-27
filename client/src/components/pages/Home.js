import React, { Component } from "react";
import "./Home.css";
import { navigate} from "@reach/router";
import Navbar from "../modules/Navbar";
import PetState from "../modules/PetState.js"
import { get } from "../../utilities";
import moment from "moment"; 
import Footer from "../modules/Footer.js";
import Question from "../modules/Question.js"
import Loading from "./Loading.js";

class Home extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        user: undefined, 
        petState: 0, 
        petter: null,
        navdisplay: false, 
        petmood: undefined, 
      };
  }

 async componentDidMount() {
    console.log("before mounting" + this.state.petmood);
    // remember -- api calls go here!
    const dayBefore = {timestamp: moment().local().subtract(1, 'days').startOf('day')};
    const dayNow = {timestamp: moment().local().startOf('day')};

    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ user: user, petter:user.petType}));
    await get("/api/journalentrieschanged", dayBefore).then((entryBefore) => {
      if(entryBefore.entries){
        this.setState({
          petState: 1,
        }, () => { get("/api/journalentrieschanged", dayNow).then((entryObjs) => {
          if (entryObjs.entries) {
            this.setState({
              petState:2,
              petmood:<span>happy</span>,
              });
            }
            if(this.state.petState===1) {
              this.setState({
                petmood:<span>content</span>,
              });
            } 
        });});
      }else{
        this.setState({
          petState: 0,
        }, () => { get("/api/journalentrieschanged", dayNow ).then((entryObjs) => {
          if (entryObjs.entries) {
            this.setState({
              petState: 1, 
              petmood:<span>content</span>,
              });
            }
            if(this.state.petState===0) {
              this.setState({
                petmood:<span>disappointed</span>,
              })
            } 
        });});
      }
    })
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
    let pet = null;
    let mood = null; 
    if(!this.state.petter){
      return(
        <Loading/>);
    }
    else if(this.state.petter == "0"){
      pet = <span>chocolate</span>
    } else if(this.state.petter =="1"){
      pet = <span>peaches</span>
    } else if(this.state.petter =="2"){
      pet = <span>nugget</span>
    } else if(this.state.petter =="3"){
      pet = <span>pork bun</span>
    } else if(this.state.petter =="4"){
      pet = <span>waffles</span>
    } else if(this.state.petter =="5"){
      pet = <span>sir</span>
    } 
    if(this.state.petState===0){
      mood = <span>disappointed</span>
    }else if(this.state.petState===1){
      mood = <span>content</span>
    }else{
      mood = <span>happy</span>
    }

    return (
      <>
      {/* <div className="con">
      <button className="cons" onClick={() => {
          this.incrementPetState();
          }}> Increase Consistency </button>
          <button className="cons" onClick={() => {
          this.decreasePetState();
          }}> Decrease Consistency </button>
      </div>       */}
      <Navbar handleLogout={this.props.handleLogout} userId={this.props.userId} user={this.props.user}/>
      <Question/>
      <div className="home-background">
        <div className="home-content">
        <h1 className="Petstate">{pet} is {this.state.petmood}</h1>
        <button className = "reflect-button" onClick={() => navigate('/newentry')}>reflect</button>
        <PetState petState={this.state.petState} userId={this.props.userId}/>
        {/* <p id="date">{moment().format("MM/DD/YYYY")}</p> */}
        </div>
        <svg viewBox="0 0 200 50" id = "ellipse-viewbox" xmlns="http://www.w3.org/2000/svg">
          <ellipse id="home-ellipse" cx="100" cy="50" rx="150" ry="20"/>
        </svg>
      </div>
      <Footer/>
      </>
    );
  }
}

export default Home;
