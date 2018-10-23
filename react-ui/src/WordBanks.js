import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";

export class WordBanks extends Component {
  constructor(props) {
    super(props);
    const { wordbanks } = props.location.state;
    this.state = {
      wordbanks,
      editingDialog: false,
      oldName: '',
      newName: ''
    };
  }

  handleRemoveWordBank(name) {
    const wordbanks = [...this.state.wordbanks].filter(
      wordbank => wordbank.name !== name
    );
    this.setState({ wordbanks });
  }

  handleAddWordBank(name) {
    const date = new Date();
    const createdAt = `Created on ${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    const wordbank = {
      id: 0,
      name,
      createdAt,
      words: []
    }
    const wordbanks = [...this.state.wordbanks, wordbank];
    this.setState({ wordbanks });
  }

  handleOpenDialog(name) {
    this.setState({ editingDialog: true, oldName: name });
  }

  handleCloseDialog() {
    this.setState({ editingDialog: false, oldName: '', newName: '' });
  }

  handleSubmitDialog() {
    const { oldName, newName } = this.state;
    const wordbanks = [...this.state.wordbanks];
    wordbanks.forEach(wordbank => { if (wordbank.name === oldName) wordbank.name = newName });
    this.setState({ wordbanks });
    this.handleCloseDialog();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.editingDialog}
          onClose={() => this.handleCloseDialog()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Word Bank Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the word bank's name
            </DialogContentText>
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
            <Button onClick={() => this.handleCloseDialog()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmitDialog()} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.wordbanks.length ? (
          <List>
            {this.state.wordbanks.map((wordbank, i) => {
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
                      onClick={() => this.handleOpenDialog(wordbank.name)}
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
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export class WordBank extends Component {
  constructor(props) {
    super(props);
    const { wordbank } = props.location.state;
    this.state = {
      wordbank
    };
  }

  render() {
    return (
      <div>
        {this.state.wordbank.words.length ? (
          <List>
            {this.state.wordbank.words.map((word, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText primary={word} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
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
      </div>
    );
  }
}
