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

import "./Entry.css";
import sleepy from "../../assets/dog_sleep.svg"
import HomeButton from "../modules/HomeButton";
import { navigate, Router } from "@reach/router";
import journalentry from "../../../../server/models/journalentry";
import { get } from "../../utilities";

class Entry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty(), isSaved: true};
 
      this.onChange = (editorState) => {
        const contentState = editorState.getCurrentContent(); 
        console.log('content state', convertToRaw(contentState));
        this.setState({
          editorState:editorState,
          isSaved: false,
          entries: [],
        });
      };
    }
    
  componentDidMount(){
      get("/api/journalentries").then((entryObjs) =>{
        this.setState({
          entries:entryObjs
        })
      })
    }

  render() {
    return (
    <div className="newEntry-background">
      <div>{JSON.stringify(this.state.entries)}</div>
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
          <p className="dateTime-display ">01/16/2021</p>
          <h1 className="title">january 16, 2021</h1>
          <img src={sleepy} className="petImage"/>
          <div className="box blueFloor">hellooooo</div>
          <div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              // customStyleMap={customStyleMap}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyBindings}
              // blockRenderMap={extendedBlockRenderMap}
              // blockStyleFn={(block) => this.getBlockStyle(block, customStyleMap)}
              placeholder="Pls"
            />
          </div>
        </div>
        <div >
          <span >
            {this.state.isSaved ? "All changes saved" : "Unsaved"}
          </span>
        </div>
      </div>
  //   return (
  //     <>
  //     <div>Journaling page</div>
  //     <Editor editorState={this.state.editorState} onChange={this.onChange}>hello<Editor/>
  //     </>
  //   );
  // }
  );
    }
}
 
export default Entry;