import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ItemDialog from '../components/Dialog';
import ListItems from '../components/ListItems';
import { BackButton } from '../components/Buttons';
import { addBank, editBank, removeBank } from '../actions';

class WordBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWordBank: {},
      dialogError: false,
      editingDialog: false,
      newWordBankName: ''
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
    const { match } = this.props;
    const pathname = `${match.url}/${wordBank.id}/words`;
    return {
      pathname
    };
  }

  handleWordBankAdd() {
    const { newWordBankName } = this.state;
    const { match, dispatch } = this.props;

    if (newWordBankName === '') return this.setState({ dialogError: true });

    const { classroom } = match.params;
    dispatch(addBank(classroom, newWordBankName));
    this.setState({ addingDialog: false, newWordBankName: '' });
  }

  handleWordBankStartEdit(currentWordBank) {
    this.setState({ editingDialog: true, currentWordBank });
  }

  handleWordBankEdit() {
    const { newWordBankName, currentWordBank } = this.state;
    const { dispatch } = this.props;

    if (newWordBankName === '') return this.setState({ dialogError: true });

    const { id } = currentWordBank;
    const name = newWordBankName;
    dispatch(editBank(id, name));
    this.setState({ editingDialog: false });
  }

  handleWordBankRemove(wordBank) {
    const { dispatch } = this.props;
    const { classId, id } = wordBank;
    dispatch(removeBank(classId, id));
  }

  handleDialogChange(e) {
    this.setState({ newWordBankName: e.target.value, dialogError: false });
  }

  handleDialogClose() {
    this.setState({
      addingDialog: false,
      dialogError: false,
      editingDialog: false,
      newWordBankName: ''
    });
  }

  render() {
    const { addingDialog, dialogError, editingDialog } = this.state;
    const { wordbanks, classrooms, match, history } = this.props;
    const { classroom } = match.params;
    if (!classrooms[classroom]) console.error('handle non-existent class');
    const wordBankIds = classrooms[classroom]
      ? classrooms[classroom].wordbanks
      : [];
    const wordBankList = wordBankIds.map(Id => wordbanks[Id]);

    return (
      <div>
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Word Bank Name"
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordBankAdd}
          open={addingDialog}
          submitMsg="Add"
          title="Add Word Bank"
        />
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Word Bank Name"
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordBankEdit}
          open={editingDialog}
          submitMsg="Change"
          title="Edit WordBank"
        />
        <ListItems
          add={() => this.setState({ addingDialog: true })}
          edit={this.handleWordBankStartEdit}
          list={wordBankList}
          name="word bank"
          remove={this.handleWordBankRemove}
          title="Word Bank List"
          generateTo={this.generateTo}
        />
        <BackButton
          variant="fab"
          color="primary"
          aria-label="Back"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            outline: 'none'
          }}
          onClick={() => history.goBack()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  classrooms: state.userData.classrooms,
  wordbanks: state.userData.wordbanks
});

export default withRouter(connect(mapStateToProps)(WordBanks));
