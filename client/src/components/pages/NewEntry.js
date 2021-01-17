import React from "react";
import ReactDOM from 'react-dom';
import {
  Editor, 
  EditorState,
  RichUtils,
  getDefaultKeyBinding
} from 'draft-js';
import 'draft-js/dist/Draft.css';
 
import "./NewEntry.css";
import sleepy from "../../assets/dog_sleep.svg"

class NewEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};
 
      this.onChange = (editorState) => this.setState({editorState});
  }
 
  componentDidMount() {
    // remember -- api calls go here!
  }
 
  render() {
    return (
    <div className="newEntry-background">
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
              placeholder="How was your day?"
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
 
export default NewEntry;