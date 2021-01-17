import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";

const GOOGLE_CLIENT_ID = "1047242304905-banhh0inijubl1kiqctqsgn7ht8dg2cn.apps.googleusercontent.com";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state={
          display: "none",
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
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      render() {
        return (
          <>
            <nav className="NavBar-container">
              <div className="NavBar-linkContainer ">
                <ul><Link to="/home" className="NavBar-link">HOME</Link></ul>
                <ul><Link to="/addlater" className="NavBar-link">PET STATUS</Link></ul>
                <ul><Link to="/timeline" className="NavBar-link">TIMELINE</Link></ul>
                <ul><Link to="/addlater" className="NavBar-link">SWITCH PET</Link></ul>
                <ul>
                  {this.props.userId ? (
                  <GoogleLogout
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                    className="NavBar-link"
                    />
                  ) : (
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.props.handleLogin}
                    onFailure={(err) => console.log(err)}
                    className="NavBar-link"
                    />
                  )}
                </ul>
                
              </div>
            </nav>
            </>
        );
      }
    }
export default Navbar;
