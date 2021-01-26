import React from "react";
import Entry from "../modules/Entry.js";
import "./NewEntry.css";
import Tag from "../modules/Tag.js";
import moment from "moment"; 
import { get, post } from "../../utilities";
import Footer from "../modules/Footer.js";

class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        petter: null,
      };
    }
 
  componentDidMount() {
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ petter: user.petType }));
  }

  render() {
    let pet = null; 
    if(this.state.petter == "0"){
      pet = <div className="doggo-j"></div>
  } else if(this.state.petter =="1"){
      pet = <div className="cat-j"></div>
  } else if(this.state.petter =="2"){
      pet = <div className="dino-j"></div>
  } else if(this.state.petter =="3"){
      pet = <div className="chin-j"></div>
  } else if(this.state.petter =="4"){
      pet = <div className="whale-j"></div>
  } else if(this.state.petter =="5"){
      pet = <div className="worm-j"></div>
  } 
    return (
      <>
      <Tag userId={this.props.userId}></Tag>
    <Entry userId={this.props.userId}></Entry> 
    {pet}
    <Footer/>
      </>
      );
    }
}
 
export default NewEntry;