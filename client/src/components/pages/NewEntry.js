import React from "react";
import Entry from "../modules/Entry.js"
import "./NewEntry.css";


class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: undefined, 

      };
    }
 
  componentDidMount() {
    // remember -- api calls go here!

  }

  
 
  render() {
    let notebook = "Loading...";
    if(this.props.data){
    notebook = <Entry dateObject = {this.props.dateObject} data={this.props.data}></Entry>
    }
    return (
      <>
      {/*notebook*/}
      <Entry ></Entry>
      </>
      );
    }
}
 
export default NewEntry;