import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import slide from "./VCLogin.svg";
import "./VocaCoord.css";
import apiURL from './Constants.js';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  authenticateUser() {
    const { email, password } = this.state;

    fetch(apiURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
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
          this.props.history.push({
            pathname: "/classrooms",
            state: { classrooms }
          });
        } else if (res.status === 400) {
          alert("Your login was bad");
        }
      })
      .catch(err => console.log(err));
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
            onInput={e => this.setState({ email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            style={{ marginBottom: "5px" }}
            value={this.state.password}
            onInput={e => this.setState({ password: e.target.value })}
          />
          <Button block color="primary" onClick={() => this.authenticateUser()}>
            Log In
          </Button>
        </div>
      </div>
    );
  }
}
