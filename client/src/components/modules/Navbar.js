import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";

const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Navbar extends Component{
    constructor(props) {
        super(props);
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
            {this.props.userId ? (
                <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
                render={(renderProps) => (
                <button onClick = {renderProps.onClick} className="landing-button">Navbar Logout</button>
                )}
            />
            ) : (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
                render={(renderProps) => (
                <button onClick = {renderProps.onClick} className="landing-button">Navbar Login</button>
                )}
            />
            )}
            </>
            
        );
      }
    }
export default Navbar;
