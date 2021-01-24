import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";
import { get, post } from "../../utilities";
import arrow from "../../assets/arrow.svg";


const GOOGLE_CLIENT_ID = "1047242304905-banhh0inijubl1kiqctqsgn7ht8dg2cn.apps.googleusercontent.com";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state={
          user: undefined, 
          open: false,
        };
    }

    handleButtonClick = () => {
        this.setState({ open: !this.state.open });
      };
    
    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
          this.setState({
            open: false,
          });
        }
      };

      componentDidMount() {
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));

        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      render() {
        if (!this.state.user) {
          return <div> Loading! </div>;
        }
        let display = "show"
        if(open) {
          display = "show"
        } else{
          display = "hide"
        }
        return (
          <>
            <div className="name-display" onClick = { () => {this.handleButtonClick();}}>
            <span >{this.state.user.name}</span>
            <img src={arrow} className="arrowdown"/>
            </div>

            {this.state.open ? (
            <nav className="NavBar-container show">
              <div className="NavBar-linkContainer ">
                <ul><Link to="/home" className="NavBar-link">HOME</Link></ul>
                <ul><Link to="/addlater" className="NavBar-link">PET STATUS</Link></ul>
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
            ): (
              <nav className="NavBar-container hide">
              <div className="NavBar-linkContainer ">
                <ul><Link to="/home" className="NavBar-link">HOME</Link></ul>
                <ul><Link to="/addlater" className="NavBar-link">PET STATUS</Link></ul>
                <ul><Link to="/timeline" className="NavBar-link">TIMELINE</Link></ul>
                <ul><Link to="/addlater" className="NavBar-link">SWITCH PET</Link></ul>
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
            )}


            </>
        );
      }
    }
export default Navbar;
