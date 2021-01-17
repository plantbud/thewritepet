import React, { Component } from "react";
import "./HomeButton.css";
import homeb from "../../assets/home.svg";


class HomeButton extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }
      componentDidMount() {
      }

      render() {
        return (
            <>
                <img src={homeb} className="homebutton"/>
            </>
        );
      }
    }
export default HomeButton;