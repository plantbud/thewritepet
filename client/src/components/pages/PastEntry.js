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

import doge from "../../assets/dog_normal.svg";
import beans from "../../assets/toebean.svg";

class PastEntry extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        entries: [],
        editorState: EditorState.createEmpty(), 
      };
  }

  componentDidMount() {
    get("/api/journalentrieschanged").then((entryObjs) => {
      /*const contentStateParsed = JSON.parse(this.entryObjs.entries);
      const convertedContentState = convertFromRaw(contentStateParsed);*/
      this.setState({
        entries: entryObjs,
       //editorState: EditorState.createWithContent(convertedContentState),
      });
    });
  }

  render() {
    return (
      <>
       { /*<Editor
              editorState={this.state.editorState}
              placeholder="How was your day?"
       />*/ }
      <div className="background-timeline">
        <h1 className="title">Entry Timeline</h1>
        <p className="reminder">take some time to reflect on how much you and your pet have grown</p>
        <HomeButton onClick={() => navigate('/home')}/>
        <div className="entry-card">
          <div>
            <h2 className="entry-title">01/19/2021</h2>
            <img src={beans} className="title-pic"/>
          </div>
          <div className="entry-content">{JSON.stringify(this.state.entries)}</div>
          <img src={doge} className="pet-pic"/>
        </div>
        
      </div>
      </>
    );
  }
}

export default PastEntry;
