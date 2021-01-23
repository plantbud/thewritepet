import React, { Component } from "react";
import "./PastEntry.css";
import {get} from "../../utilities"
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import HomeButton from "../modules/HomeButton";
import { navigate, Router } from "@reach/router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment"; 

import doge from "../../assets/dog_normal.svg";
import beans from "../../assets/toebean.svg";

class PastEntry extends Component {
    constructor(props) {
      super(props);
      this.state = {
        entries: [],
        editorState: EditorState.createEmpty(), 
        dateObj: moment(), 
      };
  }

  componentDidMount() {
    console.log("umm" + this.state.dateObj);
    console.log("umm type "+ typeof(this.state.dateObj.format()));
    console.log("does this worrk " + moment(this.state.dateObj).local().startOf("day"));
    console.log("does this worrk " + moment(this.state.dateObj).local().endOf("day"));

    get("/api/journalentrieschanged", { timestamp: this.state.dateObj }).then((entryObjs) => {
      this.setState({
        entries: entryObjs,
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(entryObjs.entries))),

      });
    });
  }
  onSelect = (e) => {
    console.log("changing date " + this.state.dateObj);
    this.setState({dateObj: e});
  }

  render() {
    console.log("string " + this.state.entries);
    return (
      <>
     <div className="background-timeline">
        <h1 className="title">Entry Timeline</h1>
        <p className="reminder">take some time to reflect on how much you and your pet have grown</p>
        <HomeButton onClick={() => navigate('/home')}/>
        <Calendar onClickDay= {this.onSelect} ></Calendar>
        <div className="entry-content">{JSON.stringify(this.state.entries)}</div>
        <Editor
              editorState={this.state.editorState}
              placeholder="how are you feeling?"
            />

        { /* <div className="entry-card">
          <div>
            <h2 className="entry-title">01/19/2021</h2>
            <img src={beans} className="title-pic"/>
          </div>
              </div> 
        */}
          <img src={doge} className="pet-pic"/>
        </div>
      </>
    );
  }
}

export default PastEntry;
