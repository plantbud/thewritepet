import React from "react";
import "./Loading.css";

class Loading extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
 
  componentDidMount() {
  }
  render() {
    return (
      <>
      <div className ="bgg">
      <h1 className="textload">loading :)</h1>
      </div>
      </>
    );
  }
}
export default Loading;