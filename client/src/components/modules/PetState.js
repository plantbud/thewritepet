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
    console.log("eeee" + typeof(this.state.petter) + this.state.petter);
    let consistency = this.props.petState; 
    let pet = null;
    console.log(consistency);

    if(this.state.petter == "0"){
      if(consistency<3){
        pet = <div className="sad"></div>
      }else if(consistency <8){
        pet = <div className="normal"></div>
      }
      else{
        pet = <div className="happy"></div>
      }
    } else if(this.state.petter =="1"){
      if(consistency<3){
        pet = <div className="sad-cat"></div>
      }else if(consistency <8){
        pet = <div className="normal-cat"></div>
      }
    } else if(this.state.petter =="2"){
      if(consistency<3){
        pet = <div className="sad-dino"></div>
      }else if(consistency <8){
        pet = <div className="normal-dino"></div>
      }
    }
    

    return (
      <>
      <div>
        <h1 className="Petstate">Consistency:</h1>
        <h1 className="Petstate">{this.props.petState}</h1>
        {pet}
      </div>
      </>
      );
    }
}
 
export default PetState;