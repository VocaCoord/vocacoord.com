import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ItemDialog } from "../components/Dialog.js";
import ListInfo from "../components/ListInfo.js";
import { AddButton, BackButton } from "../components/Buttons.js";
import { addWord, editWord, removeWord } from "../actions";
import { TextField, DialogContent } from "@material-ui/core";

class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWord: {},
      dialogError: false,
      editingDialog: false,
      newWordDefinition: "",
      newWordName: "",
      newWordImage: ""
    };
    this.handleWordAdd = this.handleWordAdd.bind(this);
    this.handleWordStartEdit = this.handleWordStartEdit.bind(this);
    this.handleWordEdit = this.handleWordEdit.bind(this);
    this.handleWordRemove = this.handleWordRemove.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  handleWordAdd() {
    if (this.state.newWordName === "")
      return this.setState({ dialogError: true });

    const { wordbank } = this.props.match.params;
    const word = {
      name: this.state.newWordName,
      definition: this.state.newWordDefinition,
      image: this.state.newWordImage
    };
    this.props.dispatch(addWord(wordbank, word));
    this.setState({
      addingDialog: false,
      newWordName: "",
      newWordDefinition: "",
      newWordImage: ""
    });
  }

  handleWordStartEdit(currentWord) {
    this.setState({ editingDialog: true, currentWord });
  }

  handleWordEdit() {
    if (this.state.newWordName === "")
      return this.setState({ dialogError: true });

    const id = this.state.currentWord.id;
    const word = {
      name: this.state.newWordName,
      definition: this.state.newWordDefinition,
      image: this.state.newWordImage
    };
    this.props.dispatch(editWord(id, word));
    this.setState({ editingDialog: false });
  }

  handleWordRemove(word) {
    const { wordBankId, id } = word;
    this.props.dispatch(removeWord(wordBankId, id));
  }

  handleDialogChange(e) {
    this.setState({ newWordName: e.target.value, dialogError: false });
  }

  handleDialogClose() {
    this.setState({
      addingDialog: false,
      dialogError: false,
      editingDialog: false,
      newWordName: "",
      newWordDefinition: "",
      newWordImage: ""
    });
  }

  handleChangeImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const changeImage = newWordImage => this.setState({ newWordImage });
    reader.addEventListener("load", () => changeImage(reader.result), false);
    if (file) reader.readAsDataURL(file);
  }

  render() {
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
        >
          <DialogContent>
            <TextField
              margin="dense"
              label={"Definition"}
              fullWidth
              onChange={e =>
                this.setState({ newWordDefinition: e.target.value })
              }
            />
          </DialogContent>
          <DialogContent>
            <img
              src={this.state.newWordImage}
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
        >
          <DialogContent>
            <TextField
              margin="dense"
              label={"Definition"}
              fullWidth
              onChange={e =>
                this.setState({ newWordDefinition: e.target.value })
              }
            />
          </DialogContent>
          <DialogContent>
            <img
              src={this.state.newWordImage}
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeImage}
            />
          </DialogContent>
        </ItemDialog>
        <ListInfo
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
