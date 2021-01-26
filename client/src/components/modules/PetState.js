import React, {Component} from "react";
import "./PetState.css";
import { get } from "../../utilities";

class PetState extends Component {
    constructor(props) {
      super(props);
      this.state = {
        petter: null, 
      };
    }
 
  componentDidMount() {
    // remember -- api calls go here!
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ petter: user.petType }));
  }


  render() {
    let consistency = this.props.petState; 
    let pet = null;

    if(this.state.petter == "0"){
      if(consistency===0){
        pet = <div className="sad"></div>
      } else if(consistency===1){
        pet = <div className="normal"></div>
      } else{
        pet = <div className="happy"></div>
      }
    } else if(this.state.petter =="1"){
      if(consistency===0){
        pet = <div className="sad-cat"></div>
      } else if(consistency===1){
        pet = <div className="normal-cat"></div>
      } else{
        pet = <div className="happy-cat"></div>
      }
    } else if(this.state.petter =="2"){
      if(consistency===0){
        pet = <div className="sad-dino"></div>
      } else if(consistency===1){
        pet = <div className="normal-dino"></div>
      } else{
        pet = <div className="happy-dino"></div>
      }
    } else if(this.state.petter =="3"){
      if(consistency===0){
        pet = <div className="sad-chin"></div>
      } else if(consistency===1){
        pet = <div className="normal-chin"></div>
      } else{
        pet = <div className="happy-chin"></div>
      }
    } else if(this.state.petter =="4"){
      if(consistency===0){
        pet = <div className="sad-whale"></div>
      } else if(consistency===1){
        pet = <div className="normal-whale"></div>
      } else{
        pet = <div className="happy-whale"></div>
      }
    } else if(this.state.petter =="5"){
      if(consistency===0){
        pet = <div className="sad-worm"></div>
      } else if(consistency===1){
        pet = <div className="normal-worm"></div>
      } else{
        pet = <div className="happy-worm"></div>
      }
    }

    return (
      <>
      <div>
        <h1 className="Petstate">Pet Mood:</h1>
        <h1 className="Petstate">{this.props.petState}</h1>
        {pet}
      </div>
      </>
      );
    }
}
 
export default PetState;