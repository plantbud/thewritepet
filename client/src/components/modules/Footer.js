import React, { Component } from "react";
import "./Footer.css";
import sprout from "../../assets/sprout.svg";

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
            <div className="fconainter">
                <div className="footer-text">the write pet</div>
                <img src={sprout} className="footer-image"/>
            </div>
            </>
        );
      }
    }
export default Footer;