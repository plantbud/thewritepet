import React, { Component } from "react";
import "./PetStatus.css";
import {get} from "../../utilities"
import HomeButton from "../modules/HomeButton";
import Footer from "../modules/Footer.js";
import Loading from "../pages/Loading.js";

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
    let profilename = null; 
    let petinfo = null; 
    let pet = null;
    if(!this.state.petter){
      return(<Loading/>);
    }
    else if(this.state.petter == "0"){
      profilename = <div className="titlep">chocolate</div>
      pet = <div className="doggo-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: doggo</h2>
        <h2 className= "info">favorite food: vanilla macarons</h2>
        <h2 className= "info">hobby: cityscape photgraphy</h2>
        <h2 className= "info">worry: accidentally eating chocolate</h2>
        <h2 className= "info">fun fact: makes really good cafe drinks</h2>
      </div>
  } else if(this.state.petter =="1"){
      profilename = <div className="titlep">peaches</div>
      pet = <div className="cat-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: kitty</h2>
        <h2 className= "info">favorite food: finely aged cheddar</h2>
        <h2 className= "info">hobby: lifestyle content creator</h2>
        <h2 className= "info">worry: getting paws dirty</h2>
        <h2 className= "info">fun fact: does not actually have nine lives</h2>
      </div>
  } else if(this.state.petter =="2"){
      profilename = <div className="titlep">nugget</div>
      pet = <div className="dino-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: dino</h2>
        <h2 className= "info">favorite food: carrots and hummus</h2>
        <h2 className= "info">hobby: planting trees</h2>
        <h2 className= "info">worry: global warming</h2>
        <h2 className= "info">fun fact: shortest in their grade</h2>
      </div>
  } else if(this.state.petter =="3"){
      profilename = <div className="titlep">pork bun</div>
      pet = <div className="chin-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: chinchilla</h2>
        <h2 className= "info">favorite food: oats</h2>
        <h2 className= "info">hobby: parkour</h2>
        <h2 className= "info">worry: what to eat next</h2>
        <h2 className= "info">fun fact: not actually made out of pork</h2>
      </div>
  } else if(this.state.petter =="4"){
      profilename = <div className="titlep">waffles</div>
      pet = <div className="whale-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: whale</h2>
        <h2 className= "info">favorite food: lettuce</h2>
        <h2 className= "info">hobby: snowboarding</h2>
        <h2 className= "info">worry: not being allowed on rollarcoasters</h2>
        <h2 className= "info">fun fact: holds multiple speedrun records for Mario</h2>
      </div>
  } else if(this.state.petter =="5"){
      profilename = <div className="titlep">sir</div>
      pet = <div className="worm-p"></div>
      petinfo = 
      <div className="infocontainer">
        <h2 className= "info">species: worm</h2>
        <h2 className= "info">favorite food: ravioli</h2>
        <h2 className= "info">hobby: line dancing</h2>
        <h2 className= "info">worry: being mistaken for spaghetti</h2>
        <h2 className= "info">fun fact: has a green thumb</h2>
      </div>
  } 
    return (
      <>
     <div className="profile-background">
       <div className ="containert"> {profilename}</div>
        <HomeButton id="pinkhome"/>
        <div className = "petprofile">
          <div className="petcontain">{pet}</div>
          <div className="petinfocontain">
            {petinfo}
          </div>
          </div>

          <Footer/>
        </div>
      </>
    );
  }
}

export default PetStatus;
