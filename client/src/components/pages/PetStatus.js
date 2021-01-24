import React, { Component } from "react";
import "./PetStatus.css";
import {get} from "../../utilities"
import HomeButton from "../modules/HomeButton";
import Footer from "../modules/Footer.js";

class PetStatus extends Component {
    constructor(props) {
      super(props);
      this.state = {
        petter: null, 
      };
  }

  componentDidMount() {
    get("/api/user", {userid: this.props.userId }).then((user) => this.setState({ petter: user.petType}));
  }

  render() {
    let pet = null;
    if(this.state.petter == "0"){
      pet = <div className="doggo-p"></div>
  } else if(this.state.petter =="1"){
      pet = <div className="cat-p"></div>
  } else if(this.state.petter =="2"){
      pet = <div className="dino-p"></div>
  } else if(this.state.petter =="3"){
      pet = <div className="chin-p"></div>
  } else if(this.state.petter =="4"){
      pet = <div className="whale-p"></div>
  } else if(this.state.petter =="5"){
      pet = <div className="worm-p"></div>
  } 

    return (
      <>
     <div className="background-timeline">
        <h1 className="title">pet profile</h1>
        <HomeButton onClick={() => navigate('/home')}/>
          {pet}
          <Footer/>
        </div>
      </>
    );
  }
}

export default PetStatus;
