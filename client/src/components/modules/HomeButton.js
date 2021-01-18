import React, { Component } from "react";
import "./HomeButton.css";
import homeb from "../../assets/home.svg";
import { navigate, Router } from "@reach/router";


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
                <img src={homeb} className="homebutton" onClick={() => navigate('/home')}/>
            </>
        );
      }
    }
export default HomeButton;