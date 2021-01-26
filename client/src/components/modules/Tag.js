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


class Tag extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(), 
        tags: "",
        // consist: 0, 
      };
 
      this.onChange = (editorState) => {
        const contentState = editorState.getCurrentContent(); 
        this.setState({
          editorState: editorState,
        });
      };
    }
    
  componentDidMount(){
    get("/api/tags").then((tagObjs) => {
        console.log("tagObjs " + tagObjs.content);
      this.setState({
        content: tagObjs,
        // editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(tagObjs.content))),
      });
    })
    // get("/api/user", { userid: this.props.userId }).then((user) => this.setState({ consist: user.consistency }));
    }
    
    submitTag = (editorState) => {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      let contentStateString = JSON.stringify(rawContentState);

      const tagchange = {
        content: contentStateString, 
      };
      post("/api/tagger", tagchange).then((tags) => {
        console.log("change tags" + tagchange)
      });
    console.log("TAGS" + this.state.consist);
    }

  render() {
    if( !this.state.editorState){
      return(
        <h3>loading</h3>
      )
    }
    return (
    <div>
        <div>
        <button onClick= { () => 
        this.submitTag(this.state.editorState)
        }>Submit Tag</button>
          <h1 className="title">{moment().format("LL")}</h1>
          <div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyBindings}
              placeholder="type your tag here"
            />
          </div>
        </div>
      </div>
  );
    }
}
 
export default Tag;