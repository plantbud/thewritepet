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

class PastEntry extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        entries: [],
      };
  }

  componentDidMount() {
    get("/api/journalentrieschanged").then((entryObjs) => {
      this.setState({
        entries: entryObjs
      });
    });
  }

  render() {
    return (
      <>
      <div className="background-timeline">
      <div>Entry Timeline</div>
      <HomeButton onClick={() => navigate('/home')}/>
      <div>{JSON.stringify(this.state.entries)}</div>
      </div>
      </>
    );
  }
}

export default PastEntry;
