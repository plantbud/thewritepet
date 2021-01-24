import React from "react";
import "./ChangePet.css";
import moment from "moment"; 
import { get, post } from "../../utilities";
import doggo from "../../assets/dog_normal.svg";
import catto from "../../assets/kitty_normal.svg";
import dino from "../../assets/dino_normal.svg";
import chin from "../../assets/chin_normal.svg";
import whale from "../../assets/whale_normal.svg";
import worm from "../../assets/worm_normal.svg";
import HomeButton from "../modules/HomeButton";
import { navigate, Router } from "@reach/router";

class ChangePet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          pet: "", 
      };
    }
 
  componentDidMount() {
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ pet: user.petType }));
    console.log("hello " + this.state.pet);

  }

  switchDoggo = (pet) => {
    console.log(pet);
    this.setState({pet: 0}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        console.log('um ' + this.state.pet);
        post("/api/user/pettype", changer).then((petter) => {
            console.log("did it work");
          });
    })
  }

  switchCatto = (pet) => {
    this.setState({pet: 1}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer).then((petter) => {
          });
    })
  }
  switchDino = (pet) => {
    this.setState({pet: 2}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer).then((petter) => {
          });
    })
  }
  switchChin = (pet) => {
    this.setState({pet: 3}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer).then((petter) => {
          });
    })
  }

  switchWhale = (pet) => {
    this.setState({pet: 4}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer).then((petter) => {
          });
    })
  }
  switchWorm = (pet) => {
    this.setState({pet: 5}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer).then((petter) => {
          });
    })
  }

  render() {
    return (
      <>
      <div>change</div>
      <HomeButton onClick={() => navigate('/home')}/>
      <img src={doggo} className="pet" onClick= { () => this.switchDoggo(this.state.pet)}/>
      <img src={catto} className="pet" onClick= { () => this.switchCatto(this.state.pet)}/>
      <img src={dino} className="petDino" onClick= { () => this.switchDino(this.state.pet)}/>
      <img src={chin} className="pet" onClick= { () => this.switchChin(this.state.pet)}/>
      <img src={whale} className="petDino" onClick= { () => this.switchWhale(this.state.pet)}/>
      <img src={worm} className="pet" onClick= { () => this.switchWorm(this.state.pet)}/>



      </>
      );
    }
}
 
export default ChangePet;