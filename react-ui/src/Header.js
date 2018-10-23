import React, { Component } from "react";
import logo from "./VCLogo.png";
import { Button } from "reactstrap";
import "./VocaCoord.css";
import { Link } from "react-router-dom";
import { sessionService } from "redux-react-session";

const logoStyle = {
  color: "white"
};

export default class Header extends Component {
  logOut() {}

  render() {
    return (
      <div className="App-header">
        <Link to="/" style={logoStyle}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-logo-text">ocaCoord</h1>
        </Link>
        {this.props.authenticated ? (
          <div className="App-header-info">
            <Link to="/classrooms">
              <Button color="primary">Your Classes</Button>
            </Link>{" "}
            <Button
              color="primary"
              outline
              onClick={() => {
                sessionService.deleteSession();
                sessionService.deleteUser();
              }}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="App-login-buttons">
            <Link to="/login">
              <Button color="primary">Log In</Button>
            </Link>{" "}
            <Link to="/signup">
              <Button color="primary" outline>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
