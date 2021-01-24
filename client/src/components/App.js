import React, { Component } from "react";
import { navigate, Router, Redirect } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Home from "./pages/Home.js";
import NewEntry from "./pages/NewEntry.js";
import PastEntry from "./pages/PastEntry.js";
import ChangePet from "./pages/ChangePet.js";
import PetStatus from "./pages/PetStatus.js";

import "../utilities.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import moment from "moment"; 
/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      consistentcy: 0, 
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id, 
        });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    }).then(() => {
      navigate("/home");
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(() => {
      navigate("/");
    });
  };

  render() {
    if(this.state.userId) {
      return(
        <>
        <Router>
          <Home
            path="/home"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
            consistency = {this.state.consistentcy}
          />
          <Redirect from="/" to="/home" />

          <NewEntry
            path="/newentry"
            userId={this.state.userId}
            consistency = {this.state.consistentcy}
          />
          <PetStatus
            path="/profile"
            userId={this.state.userId}
            consistency = {this.state.consistentcy}
          />
          <PastEntry
            path="/timeline"
            userId={this.state.userId}
          />
          <ChangePet 
            path="/switch"
            userId={this.state.userId}
            />
          <NotFound default />
        </Router>
        </>
      );

    } else {
      return (
        <>
          <Router>
          <Landing
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <NotFound default />
        </Router>
        </>
      );
    }
  }
}

export default App;
