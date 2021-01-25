import React from "react";
import "./ChangePet.css";
import { get, post } from "../../utilities";
import doggo from "../../assets/dog_normal.svg";
import catto from "../../assets/kitty_normal.svg";
import dino from "../../assets/dino_normal.svg";
import chin from "../../assets/chin_normal.svg";
import whale from "../../assets/whale_normal.svg";
import worm from "../../assets/worm_normal.svg";
import beans from "../../assets/toebean.svg";
import HomeButton from "../modules/HomeButton";
import { navigate } from "@reach/router";
import Footer from "../modules/Footer.js";

class ChangePet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          pet: "", 
      };
    }
 
  componentDidMount() {
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ pet: user.petType }));
  }

  switchDoggo = (pet) => {
    console.log(pet);
    this.setState({pet: 0}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }

  switchCatto = (pet) => {
    this.setState({pet: 1}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }
  switchDino = (pet) => {
    this.setState({pet: 2}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }
  switchChin = (pet) => {
    this.setState({pet: 3}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }

  switchWhale = (pet) => {
    this.setState({pet: 4}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }
  switchWorm = (pet) => {
    this.setState({pet: 5}, () => {
        const pett = JSON.stringify(this.state.pet); 
        const changer = {petType: pett,};
        post("/api/user/pettype", changer);
    })
  }

  render() {
    return (
      <>
      <div className="bggg">
      <div className="choosetitle">select your pet</div>
      <HomeButton onClick={() => navigate('/home')}/>
      <div className="petcontainer">
      <img src={doggo} className="pet" onClick= { () => this.switchDoggo(this.state.pet)} />
      <img src={catto} className="pet" onClick= { () => this.switchCatto(this.state.pet)}/>
      <img src={chin} className="pet" onClick= { () => this.switchChin(this.state.pet)}/>
      <img src={worm} className="pet" onClick= { () => this.switchWorm(this.state.pet)}/>
      <img src={dino} className="petDino" onClick= { () => this.switchDino(this.state.pet)}/>
      <img src={whale} className="petDino" onClick= { () => this.switchWhale(this.state.pet)}/>
      <img src={beans} className="toebeans" />

      </div>
      <Footer/>
      </div>
      </>
      );
    }
}
 
export default ChangePet;