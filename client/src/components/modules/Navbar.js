import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";

const GOOGLE_CLIENT_ID = "1047242304905-banhh0inijubl1kiqctqsgn7ht8dg2cn.apps.googleusercontent.com";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state={
/*            display: "none",
            open: false,*/
        };
    }

    /*handleButtonClick = () => {
        this.setState({ open: !this.state.open });
      };
    
      handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
          this.setState({
            open: false,
          });
        }
      };*/

      componentDidMount() {
        //document.addEventListener("mousedown", this.handleClickOutside);
      }
    
    /*  componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }*/
    
      render() {
        return (
            <>
            {this.props.userId ? (
                <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="navbar logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
            />
            ) : (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="navbar login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
            />
            )}
            
            </>
        );
      }
    }
export default Navbar;
