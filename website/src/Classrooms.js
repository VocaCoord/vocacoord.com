import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { apiURL } from "./Constants.js";


class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      newName: ""
    }
  }
  
  handleAddClassroom() {
    let { user } = this.props;
    fetch(apiURL + "create", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.props.dispatch({
          type: "ADD_CLASS",
          payload: {
            author: user.email,
            id: json.classID,
            className: this.state.newName
          }
        });
        this.setState({ addingDialog: false });
      })
  }

  render() {
    let { user, classrooms } = this.props;
    user.classrooms = user.classrooms || [];
    classrooms = classrooms || {};
    const classList = [...user.classrooms.map((classID, i) => {
      return classrooms[classID];
    })]
    return (
      <div>
        <Dialog
          open={this.state.addingDialog}
          onClose={() => this.setState({ addingDialog: false, newName: "" })}
          aria-labelledby="form-adding-dialog-title"
        >
          <DialogTitle id="form-adding-dialog-title">
            Classroom Name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Add the classroom's name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Classroom Name"
              fullWidth
              onChange={e => this.setState({ newName: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({ addingDialog: false, newName: "" })
              }
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.handleAddClassroom()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        {classList.length ? (
          classList.map((classroom, i) => {
            return (
              <Link
                key={i}
                to={{
                  pathname: `/classrooms/${classroom.className.replace(/\s/g, '-')}/wordbanks`,
                  state: { wordbanks: classroom.wordbanks, classID: classroom.id }
                }}
              >
                <ListItem button>
                  <ListItemText primary={classroom.className} />
                </ListItem>
              </Link>
            )
          })
        ) : (
          <p>It looks like you don't have any classrooms added yet,{'\n'}
            create one on the app to get started</p>
        )}
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          style={{ position: "absolute", right: 10, bottom: 10 }}
          onClick={() => this.setState({ addingDialog: true })}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
    classrooms: state.userData.classrooms
  }
}

export default withRouter(connect(mapStateToProps)(Classrooms))