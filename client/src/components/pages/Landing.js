import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Modal from "react-modal";

import "../../utilities.css";
import "./Landing.css";
import cloud1 from "../../assets/cloud_big.svg";
import cloud2 from "../../assets/cloud_med1.svg";
import cloud3 from "../../assets/cloud_med2.svg";
import cloud4 from "../../assets/cloud_smol.svg";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "1047242304905-banhh0inijubl1kiqctqsgn7ht8dg2cn.apps.googleusercontent.com";

class Landing extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <img src={cloud1} className="cloud1"/>
        {/* <img src={cloud2} className="cloud"/>
        <img src={cloud3} className="cloud"/> */}
        <div className = "landing">
        
          <h2 className="landing-title">take a deep breath</h2>

          {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            render={(renderProps) => (
              <button onClick = {renderProps.onClick} className="landing-button">logout</button>
            )}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            render={(renderProps) => (
              <button onClick = {renderProps.onClick} className="landing-button">log in or sign up</button>
            )}
          />
        )}
          <button className = "landing-button" onClick={this.handleOpenModal}>about</button>
          <Modal isOpen={this.state.showModal} className="Modal" overlayClassName="Overlay"> 
          <button onClick={this.handleCloseModal}>X</button>
          <p>Modal text infor stuff </p>
          </Modal>
        </div>
      </>
    );
  }
}

export default Landing;
