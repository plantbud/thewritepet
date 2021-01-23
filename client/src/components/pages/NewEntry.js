import React from "react";
import Entry from "../modules/Entry.js"
import "./NewEntry.css";
import moment from "moment"; 
import { get, post } from "../../utilities";



class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
 
  componentDidMount() {
  }


  render() {
    return (
      <>
    <Entry userId={this.props.userId}></Entry> 
      </>
      );
    }
}
 
export default NewEntry;