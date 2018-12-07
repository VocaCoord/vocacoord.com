import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import slide from "./assets/VCLogin.svg";
import "./VocaCoord.css";
import { apiURL } from "./constants/Assorted";
import { PulseLoader } from "react-spinners";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { authenticateUser } from "./actions/index.js";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./constants/ActionTypes";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggingIn: false
    };
  }

  handleLogIn() {
    this.setState({ loggingIn: true });

    const { email, password } = this.state;

    fetch(apiURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(json => {
        this.props.dispatch(authenticateUser(json));
        if (json.response.status === LOGIN_SUCCESS)
          return this.props.history.push("/classrooms");
        if (json.response.status === LOGIN_FAILURE)
          setTimeout(
            () => this.setState({ loggingIn: false, loginError: true }),
            1000
          );
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.setState({ loggingIn: false });
  }

  render() {
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-login">
          <Input
            placeholder="Email"
            align="center"
            style={{ marginBottom: "5px" }}
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            style={{ marginBottom: "5px" }}
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          {this.state.loggingIn ? (
            <div className="App-spinner">
              <PulseLoader color={"blue"} />
            </div>
          ) : (
            <Button block color="primary" onClick={() => this.handleLogIn()}>
              Log In
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Login));
