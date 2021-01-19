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
import { get, post } from "../../utilities";

class Entry extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(), 
        isSaved: true,
      };
 
      this.onChange = (editorState) => {
        const contentState = editorState.getCurrentContent(); 
        //console.log('content state', convertToRaw(contentState));
        this.setState({
          editorState: editorState,
          isSaved: false,
        });
      };
    }
    
  componentDidMount(){
    get("/api/journalentrieschanged").then((entryObjs) => {
      /*const contentStateParsed = JSON.parse(this.journalentries.entries);
      const convertedContentState = convertFromRaw(contentStateParsed);
      this.setState({
        editorState: EditorState.createWithContent(convertedContentState),
        entries: EditorState.createWithContent(convertedContentState), 
      });*/
    })
    
    }
    
    submitEntry = (editorState) => {
      const currentContentState = this.state.editorState.getCurrentContent();
      const newContentState = editorState.getCurrentContent();
      console.log("tes1" + currentContentState)
      console.log("sfsajhjh" + newContentState)

      const rawContentState = convertToRaw(editorState.getCurrentContent());
      let contentStateString = JSON.stringify(rawContentState);
      console.log("sahhh" + contentStateString);

      const entrychange = {
        entries: contentStateString, 
      };

      post("/api/journalentries", entrychange).then((journalentries) => {
        console.log("change entrys" + entrychange)
        this.setState({
          isSaved: true,
        });
      });

    }
    /*
    componentDidUpdate(prevProps, prevState) {
      if (this.props.data !== prevProps.data) {
        if (this.props.data.journalentries.entries) {
          const contentStateParsed = JSON.parse(this.props.data.journalentries.entries);
          const convertedContentState = convertFromRaw(contentStateParsed);
          console.log("content state string parsed" + contentStateParse);
          this.setState({
            editorState: EditorState.createWithContent(convertedContentState),
          });
        } else {
          console.log("content state string empty" );

          this.setState({
            editorState: EditorState.createEmpty(),
          });
        }
      }
    }
*/
    handleSave = debounce((editorState) => {
      const currentContentState = this.state.editorState.getCurrentContent();
      const newContentState = editorState.getCurrentContent();
  
      if (currentContentState == newContentState) {
        // There was a change in the content
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        let contentStateString = JSON.stringify(rawContentState);
        console.log("content state string stringified" + contentStateString)
        console.log("type " + typeof(contentStateString));

        if (!editorState.getCurrentContent().hasText()) {
          const rawEmptyContentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
          contentStateString = JSON.stringify(rawEmptyContentState);
          console.log("not content content state" + contentStateString)

        }
        const entrychange = {
          entries: contentStateString, 
        };

        post("/api/journalentries", entrychange).then((journalentries) => {
          console.log("params" + entrychange)
          //const convertedContentState = convertFromRaw(notes);
          //const editorStateWithContent = EditorState.createWithContent(convertedContentState);
          this.setState({
            // editorState: EditorState.forceSelection(editorStateWithContent, currentSelection),
            isSaved: true,
            //journalentries: editorStateWithContent,

          });
        });
      } else {
        console.log("false alarm!");
        // The change was triggered by a change in focus/selection
      } // const currentSelection = this.state.editorState.getSelection();
    }, 1000);

  render() {
    return (
    <div className="newEntry-background">
      <button className = "submit-entry" onClick= { () => this.submitEntry(this.state.editorState)}>Submit entry</button>
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
          <span className= "saved">
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