import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";
import { get, post } from "../../utilities";
import arrow from "../../assets/arrow.svg";
import Loading from "../pages/Loading.js";

const GOOGLE_CLIENT_ID = "1047242304905-banhh0inijubl1kiqctqsgn7ht8dg2cn.apps.googleusercontent.com";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state={
          user: undefined, 
          open: undefined,
        };
    }

    handleButtonClick = () => {
      console.log("state of open before" + this.state.open);

        this.setState({ open: !this.state.open });
        console.log("state of open " + this.state.open);
      };

      componentDidMount() {
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
      }
    
      render() {
        if (!this.state.user) {
          return <Loading/>;
        }
        let display = "hidden";
        if(this.state.open==undefined){
          display="hidden";
        }
        else if(this.state.open) {
          display = "show"
        } else{
          display = "hide";
        }
        return (
          <>
            <div className="name-display" onClick = { () => {this.handleButtonClick();}}>
            <span className="namecard">{this.state.user.name}</span>
            {this.state.open ? ( <img src={arrow} className= "namecard arrowup"/>): (<img src={arrow} className= "namecard arrowdown"/>)}
            </div>
            
            <nav className={"NavBar-container "+ display }>
              <div className="NavBar-linkContainer ">
                <ul><Link to="/profile" className="NavBar-link">PET PROFILE</Link></ul>
                <ul><Link to="/timeline" className="NavBar-link">TIMELINE</Link></ul>
                <ul><Link to="/switch" className="NavBar-link">SWITCH PET</Link></ul>
                <ul>
                  <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="logout"
                  onLogoutSuccess={this.props.handleLogout}
                  onFailure={(err) => console.log(err)}
                  render={(renderProps) => (
                    <button onClick = {renderProps.onClick} className="NavBar-logout">LOGOUT</button>
                  )}
                  />
                </ul>
              </div>
            </nav>
            
            {/* //   <nav className="NavBar-container hide">
            //   <div className="NavBar-linkContainer ">
            //     <ul><Link to="/addlater" className="NavBar-link">PET PROFILE</Link></ul>
            //     <ul><Link to="/timeline" className="NavBar-link">TIMELINE</Link></ul>
            //     <ul><Link to="/addlater" className="NavBar-link">SWITCH PET</Link></ul>
            //     <ul>
            //       <GoogleLogout
            //       clientId={GOOGLE_CLIENT_ID}
            //       buttonText="logout"
            //       onLogoutSuccess={this.props.handleLogout}
            //       onFailure={(err) => console.log(err)}
            //       render={(renderProps) => (
            //         <button onClick = {renderProps.onClick} className="NavBar-logout">LOGOUT</button>
            //       )}
            //       />
            //     </ul>
            //   </div>
            // </nav> */}
            
            </>
        );
      }
    }
export default Navbar;
