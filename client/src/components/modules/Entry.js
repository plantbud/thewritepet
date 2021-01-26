import React, {Component} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import debounce from 'lodash/debounce';

import "./Tag.js";

import "./Entry.css";
import HomeButton from "../modules/HomeButton";
import { navigate, Router } from "@reach/router";
import { get, post } from "../../utilities";
import moment from "moment"; 


class Entry extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(), 
        isSaved: true,
        consist: 0, 
      };
 
      this.onChange = (editorState) => {
        const contentState = editorState.getCurrentContent(); 
        this.setState({
          editorState: editorState,
          isSaved: false,
        });
      };
    }
    
  componentDidMount(){
    const timing = {timestamp: moment().local().startOf("day")};
    get("/api/journalentriesday", timing).then((entryObjs) => {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(entryObjs.entries))),
      });
    })
    get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ consist: user.consistency }));
    }
    
    submitEntry = (editorState) => {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      let contentStateString = JSON.stringify(rawContentState);

      const entrychange = {
        entries: contentStateString, 
        timestamp: moment().local(),
      };
      post("/api/journalentries", entrychange).then((journalentries) => {
        console.log("change entrys" + entrychange)
        this.setState({
          isSaved: true,
        });
      });
      console.log("consist before " + this.state.consist);
      
    }

  render() {
    if( !this.state.editorState){
      return(
        <h3>loading</h3>
      )
    }
    return (
    <div className="newEntry-background">
        <HomeButton onClick={() => navigate('/home')}/>
        <div className="journal-box">
          {/* <Toolbar
            editorState={this.state.editorState}
            setInlineStyle={this.setInlineStyle}
            fontFamilyStyleMap={fontFamilyStyleMap}
            fontSizeStyleMap={fontSizeStyleMap}
            textColorStyleMap={textColorStyleMap}
            highlightStyleMap={highlightStyleMap}
            toggleInlineStyle={this.toggleInlineStyle}
            toggleBlockType={this.toggleBlockType}
          /> */}
         {/*<p className="dateTime-display ">01/16/2021</p> */} 
         <div className="submitcontainer">
         <button className = "submit-entry" onClick= { () => this.submitEntry(this.state.editorState)}>submit</button>
         <h1 className="titleentry">{moment().format("LL")}</h1>
          
         </div>
          
          {/* <div className="box blueFloor">hellooooo</div> */}
          <div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              // customStyleMap={customStyleMap}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyBindings}
              // blockRenderMap={extendedBlockRenderMap}
              // blockStyleFn={(block) => this.getBlockStyle(block, customStyleMap)}
              placeholder="how are you feeling?"
            />
          </div>
        </div>
        <div >
          <span className= "saved">
            {this.state.isSaved ? "All changes saved" : "Unsaved"}
          </span>
        </div>
      </div>
  );
    }
}
 
export default Entry;