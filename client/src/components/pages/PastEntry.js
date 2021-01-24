import React, { Component } from "react";
import "./PastEntry.css";
import {get} from "../../utilities"
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import HomeButton from "../modules/HomeButton";
import { navigate, Router } from "@reach/router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment"; 
import beans from "../../assets/toebean.svg";
import Footer from "../modules/Footer.js";

class PastEntry extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(), 
        dateObj: moment(), 
        petter: null, 
      };
  }

  componentDidMount() {
    get("/api/journalentrieschanged", { timestamp: this.state.dateObj }).then((entryObjs) => {
      if (entryObjs.entries) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(entryObjs.entries))),
        });
      } else {
        this.setState({
          editorState: EditorState.createEmpty(),
        });
      }
    });
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ petter: user.petType }));
  }

  onSelect = (e) => {
    this.setState({dateObj: e}, () => { get("/api/journalentrieschanged", { timestamp: this.state.dateObj }).then((entryObjs) => {
      if (entryObjs.entries) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(entryObjs.entries))),
        });
      } else {
        this.setState({
          editorState: EditorState.createEmpty(),
        });
      }
    });})
  }

  render() {
    let pet = null;
    if(this.state.petter == "0"){
      pet = <div className="doggo"></div>
    } else if(this.state.petter =="1"){
      pet = <div className="cat"></div>
    } else if(this.state.petter =="2"){
      pet = <div className="dino"></div>
    } else if(this.state.petter =="3"){
      pet = <div className="chin"></div>
    } else if(this.state.petter =="4"){
      pet = <div className="whale"></div>
    } else if(this.state.petter =="5"){
      pet = <div className="worm"></div>
    } 
    return (
      <>
     <div className="background-timeline">
        <h1 className="title">Entry Timeline</h1>
        <p className="reminder">take some time to reflect on how much you and your pet have grown</p>
        <HomeButton onClick={() => navigate('/home')}/>
        <Calendar onClickDay= {this.onSelect} ></Calendar>
        <Editor
              editorState={this.state.editorState}
              placeholder="No entry"
            />
          {pet}
          <Footer/>
        </div>
      </>
    );
  }
}

export default PastEntry;
