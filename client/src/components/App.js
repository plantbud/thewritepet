import React, { Component } from "react";
import { navigate, Router, Redirect } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Home from "./pages/Home.js";
import NewEntry from "./pages/NewEntry.js";
import PastEntry from "./pages/PastEntry.js";

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
      data: null, 
      dateObject: moment().local(),
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
    this.getDateData(this.state.dateObject);
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    }).then(() => {
      navigate("/home");
    }).then(() => {
      this.getDateData(this.state.dateObject);
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(() => {
      navigate("/");
    });
  };

  getDateData = async (date) => {
    // update data state
    const params = {
      day: date.format(),
    };
    const newData = await post("/api/day", params);
    this.setState({
      data: newData,
    });
  };

  setToOldDate = (date) => {
    this.setState({
      dateObject: date,
    });
    this.getDateData(date);
  };

  viewToday = () => {
    this.setState({
      dateObject: moment().local(),
    });
  };
  incrementConsistent = () => {
    this.setState({
      consistency: this.state.consistentcy + 1,
    });
  };

  render() {
    console.log("data " + this.state.data);
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
          {this.state.data ? (
                  <NewEntry
                    path="/newentry"
                    dateObject={this.state.dateObject}
                    data={this.state.data}
                  />
                ) : (
                  <NotFound path="/newentry" />
                )}
                
          <NewEntry
            path="/newentryy"
            dateObject = {this.state.dateObject}
            data = {this.state.data}
            setToOldDate= {this.setToOldDate}
            consistency = {this.state.consistentcy}
            increaseConsistent = {this.incrementConsistent}
            userId={this.state.userId}

          />
          <PastEntry
            path="/timeline"
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
