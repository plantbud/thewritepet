import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Landing.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Landing extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <div className = "landing">
          <h1 className="landing-title">take a deep breath</h1>

          {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            render={(renderProps) => (
              <button onClick = {renderProps.onClick} className="landing-button">Logout</button>
            )}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            render={(renderProps) => (
              <button onClick = {renderProps.onClick} className="landing-button">Log in with Google</button>
            )}
          />
        )}
          <button className = "landing-button" onClick={this.showModal}>About</button>
        </div>
      </>
    );
  }
}

export default Landing;
