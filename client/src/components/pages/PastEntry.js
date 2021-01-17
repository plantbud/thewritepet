import React, { Component } from "react";
import "./PastEntry.css";
import {get} from "../../utilities"

class PastEntry extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        entries: [],
      };
  }

  componentDidMount() {
    get("/api/timeline").then((entryObjs) => {
      this.setState({
        entries: entryObjs
      });
    });
  }

  render() {
    return (
      <>
      <div>Entry Timeline</div>
      <div>{JSON.stringify(this.state.entries)}</div>
      </>
    );
  }
}

export default PastEntry;
