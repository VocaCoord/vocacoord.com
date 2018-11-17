import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ItemDialog from "../components/Dialog.js";
import ListInfo from "../components/ListInfo.js";
import { AddButton, BackButton } from "../components/Buttons.js";
import { addBank, editBank, removeBank } from "../actions";

class WordBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWordBank: {},
      dialogError: false,
      editingDialog: false,
      newWordBankName: ""
    };
    this.generateTo = this.generateTo.bind(this);
    this.handleWordBankAdd = this.handleWordBankAdd.bind(this);
    this.handleWordBankStartEdit = this.handleWordBankStartEdit.bind(this);
    this.handleWordBankEdit = this.handleWordBankEdit.bind(this);
    this.handleWordBankRemove = this.handleWordBankRemove.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  generateTo(wordBank) {
    const pathname = `${this.props.match.url}/${wordBank.id}/words`;
    return {
      pathname
    };
  }

  handleWordBankAdd() {
    if (this.state.newWordBankName === "")
      return this.setState({ dialogError: true });

    const { classroom } = this.props.match.params;
    this.props.dispatch(addBank(classroom, this.state.newWordBankName));
    this.setState({ addingDialog: false, newWordBankName: "" });
  }

  handleWordBankStartEdit(currentWordBank) {
    this.setState({ editingDialog: true, currentWordBank });
  }

  handleWordBankEdit() {
    if (this.state.newWordBankName === "")
      return this.setState({ dialogError: true });

    const id = this.state.currentWordBank.id,
      name = this.state.newWordBankName;
    this.props.dispatch(editBank(id, name));
    this.setState({ editingDialog: false });
  }

  handleWordBankRemove(wordBank) {
    const { classId, id } = wordBank;
    this.props.dispatch(removeBank(classId, id));
  }

  handleDialogChange(e) {
    this.setState({ newWordBankName: e.target.value, dialogError: false });
  }

  handleDialogClose() {
    this.setState({
      addingDialog: false,
      dialogError: false,
      editingDialog: false,
      newWordBankName: ""
    });
  }

  render() {
    const { wordbanks, classrooms } = this.props;
    const { classroom } = this.props.match.params;
    if (!classrooms[classroom]) console.log("handle non-existent class");
    const wordBankIds = classrooms[classroom]
      ? classrooms[classroom].wordbanks
      : [];
    const wordBankList = wordBankIds.map(Id => {
      return wordbanks[Id];
    });

    return (
      <div>
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Word Bank Name"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordBankAdd}
          open={this.state.addingDialog}
          submitMsg={"Add"}
          title={"Add Word Bank"}
        />
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Word Bank Name"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordBankEdit}
          open={this.state.editingDialog}
          submitMsg={"Change"}
          title={"Edit WordBank"}
        />
        <ListInfo
          edit={this.handleWordBankStartEdit}
          list={wordBankList}
          missing={
            "It looks like you don't have any wordbanks added yet, click the add button to start adding wordbanks"
          }
          remove={this.handleWordBankRemove}
          title={"Word Bank List"}
          generateTo={this.generateTo}
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
    classrooms: state.userData.classrooms,
    wordbanks: state.userData.wordbanks
  };
};

export default withRouter(connect(mapStateToProps)(WordBanks));
