import React, {Component} from "react";
import "./PetState.css";

class PetState extends Component {
    constructor(props) {
      super(props);
    }
 
  componentDidMount() {
    // remember -- api calls go here!
  }


  render() {
    let consistency = this.props.petState; 
    let pet = null;
    console.log(consistency);
    if(consistency<3){
      pet = <div className="sad"></div>
    }else if(consistency <8){
      pet = <div className="normal"></div>
    }
    else{
      pet = <div className="happy"></div>
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