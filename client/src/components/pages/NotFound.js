import React, { Component } from "react";
import "./NotFound.css";
import sadDog from "../../assets/dog_sad.svg"

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="notFound-background text">
        <h1>404 Not Found</h1>
        <p>your pet is sad because the page you requested could not be found :(</p>
        <img src={sadDog} className="sadPet-image"/>
      </div>
    );
  }
}

export default NotFound;
