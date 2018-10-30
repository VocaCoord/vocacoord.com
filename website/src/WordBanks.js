import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class WordBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingDialog: false,
      addingDialog: false,
      oldName: "",
      newName: ""
    };
  }

  handleRemoveWordBank(name) {
    const wordbanks = [...this.props.wordbanks].filter(
      wordbank => wordbank.name !== name
    );
    this.setState({ wordbanks });
  }

  handleAddWordBank() {
    const { newName } = this.state;
    const date = new Date();
    const createdAt = `Created on ${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    const wordbank = {
      id: 0,
      name: newName,
      createdAt,
      words: []
    };
    const classID = this.props.location.state.classID;
    this.props.dispatch({
      type: "ADD_BANK",
      payload: {
        ...wordbank,
        classID
      }
    })
    this.setState({ addingDialog: false, newName: "" });
  }

  handleSubmitDialog() {
    const { oldName, newName } = this.state;
    const wordbanks = [...this.props.wordbanks];
    wordbanks.forEach(wordbank => {
      if (wordbank.name === oldName) wordbank.name = newName;
    });
    this.setState({
      wordbanks,
      editingDialog: false,
      oldName: "",
      newName: ""
    });
  }

  render() {
    const { wordbanks, classrooms } = this.props;
    const IDs = classrooms[this.props.location.state.classID].wordbanks;
    const wordBankList = IDs.map(ID => {
      return wordbanks[ID];
    });

    console.log(wordBankList);
  

    return (
      <div>
        <Dialog
          open={this.state.addingDialog}
          onClose={() => this.setState({ addingDialog: false, newName: "" })}
          aria-labelledby="form-adding-dialog-title"
        >
          <DialogTitle id="form-adding-dialog-title">
            Word Bank Name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Add the word bank's name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Word Bank Name"
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
            <Button onClick={() => this.handleAddWordBank()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.editingDialog}
          onClose={() =>
            this.setState({ editingDialog: false, oldName: "", newName: "" })
          }
          aria-labelledby="form-editing-dialog-title"
        >
          <DialogTitle id="form-editing-dialog-title">
            Word Bank Name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Edit the word bank's name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Word Bank Name"
              fullWidth
              onChange={e => this.setState({ newName: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({
                  editingDialog: false,
                  oldName: "",
                  newName: ""
                })
              }
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmitDialog()} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
        {wordBankList.length ? (
          <List>
            {wordBankList.map((wordbank, i) => {
              return (
                <ListItem button key={i}>
                  <Link
                    to={{
                      pathname: `${this.props.location.pathname}/words`,
                      state: { wordbank }
                    }}
                  >
                    <ListItemText primary={wordbank.name} />
                  </Link>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        this.setState({
                          editingDialog: true,
                          oldName: wordbank.name
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleRemoveWordBank(wordbank.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <p>
            {" "}
            It looks like you don't have any wordbanks added yet,
            {"\n"}
            click the add button to start adding wordbanks
          </p>
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
        <Button
          variant="fab"
          color="primary"
          aria-label="Back"
          style={{ position: "absolute", left: 10, bottom: 10 }}
          onClick={() => this.props.history.goBack()}
        >
          <ArrowBackIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
    classrooms: state.userData.classrooms,
    wordbanks: state.userData.wordbanks
  }
}


export default withRouter(connect(mapStateToProps)(WordBanks));