import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ItemDialog from "../components/Dialog.js";
import ListItems from "../components/ListItems.js";
import { AddButton, BackButton } from "../components/Buttons.js";
import { addWord, editWord, removeWord } from "../actions";
import { TextField, DialogContent } from "@material-ui/core";

class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWord: {
        name: "",
        definition: "",
        image: ""
      },
      dialogError: false,
      editingDialog: false
    };
  }

  handleWordAdd = () => {
    if (this.state.currentWord.name === "")
      return this.setState({ dialogError: true });

    const { wordbank } = this.props.match.params;
    const { name, definition, image } = this.state.currentWord;
    const word = { name, definition, image };
    this.props.dispatch(addWord(wordbank, word));
    this.setState({
      addingDialog: false,
      currentWord: {
        name: "",
        definition: "",
        image: ""
      }
    });
  };

  handleWordStartEdit = currentWord => {
    this.setState({ editingDialog: true, currentWord: { ...currentWord } });
  };

  handleWordEdit = () => {
    if (this.state.currentWord.name === "")
      return this.setState({ dialogError: true });

    const { name, definition, image, id } = this.state.currentWord;
    const word = { name, definition, image };
    this.props.dispatch(editWord(id, word));
    this.setState({ editingDialog: false });
  };

  handleWordRemove = word => {
    const { wordBankId, id } = word;
    this.props.dispatch(removeWord(wordBankId, id));
  };

  handleDialogChange = e => {
    const { currentWord } = this.state;
    currentWord.name = e.target.value;
    this.setState({ currentWord, dialogError: false });
  };

  handleDialogClose = () => {
    this.setState({
      addingDialog: false,
      dialogError: false,
      editingDialog: false,
      currentWord: {}
    });
  };

  handleChangeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const changeImage = image => {
      const { currentWord } = this.state;
      currentWord.image = image;
      this.setState({ currentWord });
    };
    reader.addEventListener("load", () => changeImage(reader.result), false);
    if (file) reader.readAsDataURL(file);
  };

  render() {
    const { currentWord } = this.state;
    const { wordbanks, words } = this.props;
    const { wordbank } = this.props.match.params;
    if (!wordbanks[wordbank]) console.log("handle non-existent wordbank");
    const wordIds = wordbanks[wordbank] ? wordbanks[wordbank].words : [];
    const wordList = wordIds.map(word => words[word]);
    return (
      <div>
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Word"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordAdd}
          open={this.state.addingDialog}
          submitMsg={"Add"}
          title={"Add Word"}
          value={currentWord.word}
        >
          <DialogContent>
            <TextField
              value={currentWord.definition}
              margin="dense"
              label={"Definition"}
              fullWidth
              onChange={e => {
                const { currentWord } = this.state;
                currentWord.definition = e.target.value;
                this.setState({ currentWord });
              }}
            />
          </DialogContent>
          <DialogContent>
            <img
              src={currentWord.image !== "" ? currentWord.image : null}
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeImage}
            />
          </DialogContent>
        </ItemDialog>
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Word"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordEdit}
          open={this.state.editingDialog}
          submitMsg={"Change"}
          title={"Edit Word"}
          value={currentWord.name}
        >
          <DialogContent>
            <TextField
              margin="dense"
              label={"Definition"}
              fullWidth
              onChange={e => {
                const { currentWord } = this.state;
                currentWord.definition = e.target.value;
                this.setState({ currentWord });
              }}
              value={currentWord.definition}
            />
          </DialogContent>
          <DialogContent>
            <img
              src={currentWord.image !== "" ? currentWord.image : null}
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeImage}
            />
          </DialogContent>
        </ItemDialog>
        <ListItems
          edit={this.handleWordStartEdit}
          list={wordList}
          missing={
            "It looks like you don't have any words added yet, click the add button to start adding words"
          }
          remove={this.handleWordRemove}
          title={"Word List"}
          generateTo={null}
        />
        <AddButton
          variant="fab"
          color="primary"
          aria-label="Add"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            outline: "none"
          }}
          onClick={() => this.setState({ addingDialog: true })}
        />
        <BackButton
          variant="fab"
          color="primary"
          aria-label="Back"
          style={{
            position: "absolute",
            left: 10,
            bottom: 10,
            outline: "none"
          }}
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wordbanks: state.userData.wordbanks,
    words: state.userData.words
  };
};

export default withRouter(connect(mapStateToProps)(Words));
