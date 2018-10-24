import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import slide from "./assets/VCSignup.svg";
import "./VocaCoord.css";
import { apiURL } from "./Constants.js";
import { sessionService } from "redux-react-session";
import { PulseLoader } from "react-spinners";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      signingUp: false
    };
  }

  handleSignUp() {
    this.setState({ signingUp: true })
    
    const { firstName, lastName, email, password } = this.state;

    fetch(apiURL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(res => {
        const date = new Date();
        const dateString = `Created on ${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
        const classrooms = [
          {
            className: "test class",
            wordbanks: [
              {
                id: 0,
                name: "test1",
                createdAt: dateString,
                words: ["test", "test2", "test3"]
              },
              {
                id: 1,
                name: "test2",
                createdAt: dateString,
                words: ["dragons", "love", "tacos"]
              }
            ]
          },
          {
            className: "test class 2",
            wordbanks: [
              {
                id: 0,
                name: "blah1",
                createdAt: dateString,
                words: ["blah", "blah2", "blah3"]
              },
              {
                id: 1,
                name: "blah2",
                createdAt: dateString,
                words: ["dragons", "love", "tacos"]
              }
            ]
          }
        ];
        if (res.status === 200) {
          sessionService.saveSession({ token: "a1b2c3d4" }).then(() => {
            sessionService.saveUser({ email }).then(() => {
              this.props.history.push({
                pathname: "/classrooms",
                state: { classrooms }
              });
            });
          });
        } else if (res.status === 400) {
          console.log("Your login was bad");
          setTimeout(() => this.setState({ signingUp: false }), 3000);
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.setState({ signingUp: false });
  }

  render() {
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-login">
          <Input
            placeholder="First Name"
            align="center"
            style={{ marginBottom: "5px" }}
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            align="center"
            style={{ marginBottom: "5px" }}
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
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
          {this.state.signingUp ? (
            <div className="App-spinner">
              <PulseLoader color={"blue"} />
            </div>
          ) : (
            <Button block color="primary" onClick={() => this.handleSignUp()}>
              Sign Up
            </Button>
          )}
        </div>
      </div>
    );
  }
}
