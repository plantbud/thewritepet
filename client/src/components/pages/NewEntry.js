import React from "react";
import Entry from "../modules/Entry.js";
import "./NewEntry.css";
import Tag from "../modules/Tag.js";
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
      <Tag userId={this.props.userId}></Tag>
    <Entry userId={this.props.userId}></Entry> 
      </>
      );
    }
}
 
export default NewEntry;