import React from "react";
import Entry from "../modules/Entry.js"
import "./NewEntry.css";


class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
 
  componentDidMount() {
    // remember -- api calls go here!
  }

  
 
  render() {
    return (
      <>
      <Entry/>
      </>
      );
    }
}
 
export default NewEntry;