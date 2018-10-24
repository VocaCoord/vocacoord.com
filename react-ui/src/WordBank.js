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
import { connect } from "react-redux";
import { withRouter } from "react-router";


class WordBank extends Component {
    constructor(props) {
      super(props);
      const { words } = props.location.state.wordbank;
      this.state = {
        words,
        oldWord: "",
        newWord: "",
        addingDialog: false,
        editingDialog: false
      };
    }
  
    handleRemoveWord(newWord) {
      const words = [...this.state.words].filter(word => word !== newWord);
      this.setState({ words });
    }
  
    handleAddWord() {
      const { newWord } = this.state;
      const words = [...this.state.words, newWord];
      this.setState({ words, addingDialog: false, newWord: "" });
    }
  
    handleChangeWord() {
      const { newWord, oldWord } = this.state;
      const words = [...this.state.words];
      words.forEach((word, i) => {
        if (word === oldWord) words[i] = newWord;
      });
      this.setState({ words, editingDialog: false, newWord: "", oldWord: "" });
    }
  
    handleSubmitDialog() {
      const { oldWord, newWord } = this.state;
      const words = [...this.state.words];
      words.forEach(word => {
        if (word === oldWord) word = newWord;
      });
      this.setState({
        words,
        editingDialog: false,
        oldWord: "",
        newWord: ""
      });
    }
  
    render() {
      return (
        <div>
          <Dialog
            open={this.state.addingDialog}
            onClose={() => this.setState({ addingDialog: false, newWord: "" })}
            aria-labelledby="form-adding-dialog-title"
          >
            <DialogTitle id="form-adding-dialog-title">Word</DialogTitle>
            <DialogContent>
              <DialogContentText>Add the word</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Word"
                fullWidth
                onChange={e => this.setState({ newWord: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({ addingDialog: false, newWord: "" })
                }
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => this.handleAddWord()} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.editingDialog}
            onClose={() =>
              this.setState({ editingDialog: false, oldWord: "", newWord: "" })
            }
            aria-labelledby="form-editing-dialog-title"
          >
            <DialogTitle id="form-editing-dialog-title">Word</DialogTitle>
            <DialogContent>
              <DialogContentText>Change the word</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Word"
                fullWidth
                onChange={e => this.setState({ newWord: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({
                    editingDialog: false,
                    oldWord: "",
                    newWord: ""
                  })
                }
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => this.handleChangeWord()} color="primary">
                Change
              </Button>
            </DialogActions>
          </Dialog>
          {this.state.words.length ? (
            <List>
              {this.state.words.map((word, i) => {
                return (
                  <ListItem button key={i}>
                    <ListItemText primary={word} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() =>
                          this.setState({
                            editingDialog: true,
                            oldWord: word
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => this.handleRemoveWord(word)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <p>
              It looks like you don't have any words added yet,
              {"\n"}
              click the add button to start adding words
            </p>
          )}
          <Button
            variant="fab"
            color="primary"
            aria-label="Back"
            style={{ position: "absolute", left: 10, bottom: 10 }}
            onClick={() => this.props.history.goBack()}
          >
            <ArrowBackIcon />
          </Button>
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
      );
    }
  }

  const mapStateToProps = (state) => {
    return {

    }
  }
  

  export default withRouter(connect(mapStateToProps)(WordBank));