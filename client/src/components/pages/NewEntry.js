import React from "react";
import Entry from "../modules/Entry.js"
import "./NewEntry.css";
import moment from "moment"; 
import { get, post } from "../../utilities";



class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
 
  async componentDidMount() {
    // remember -- api calls go here!
    console.log("data newentry " + this.props.data.entries);
    console.log(typeof(this.props.data.entries));

    if (this.props.oldYear && this.props.oldMonth && this.props.oldDay) {
      const dateToView = moment()
        .year(this.props.oldYear)
        .month(this.props.oldMonth)
        .date(this.props.oldDay);
      this.props.setToOldDate(dateToView);
    } else {
      // if accessed from landing page
    }
  }

  
 
  render() {
    let notebook = "Loading...";
    if(this.props.data){
    notebook = <Entry dateObject = {this.props.dateObject} data={this.props.data}></Entry>
    }
    return (
      <>
      {/*notebook*/}
      {notebook}

     {/* <Entry ></Entry> */}
      </>
      );
    }
}
 
export default NewEntry;