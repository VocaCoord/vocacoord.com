import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ItemDialog } from "../components/Dialog.js";
import ListInfo from "../components/ListInfo.js";
import { AddButton, BackButton } from "../components/Buttons.js";
import { addWord, editWord, removeWord } from "../actions";

class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWord: {},
      dialogError: false,
      editingDialog: false,
      newWordName: ""
    };
    this.handleWordAdd = this.handleWordAdd.bind(this);
    this.handleWordStartEdit = this.handleWordStartEdit.bind(this);
    this.handleWordEdit = this.handleWordEdit.bind(this);
    this.handleWordRemove = this.handleWordRemove.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleWordAdd() {
    if (this.state.newWordName === "")
      return this.setState({ dialogError: true });

    const { wordbank } = this.props.match.params;
    this.props.dispatch(addWord(wordbank, this.state.newWordName));
    this.setState({ addingDialog: false, newWordName: "" });
  }

  handleWordStartEdit(currentWord) {
    this.setState({ editingDialog: true, currentWord });
  }

  handleWordEdit() {
    if (this.state.newWordName === "")
      return this.setState({ dialogError: true });

    const id = this.state.currentWord.id,
      name = this.state.newWordName;
    this.props.dispatch(editWord(id, name));
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
      newWordName: ""
    });
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
        />
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
        />
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
