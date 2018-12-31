import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField, DialogContent } from '@material-ui/core';
import ItemDialog from '../components/Dialog';
import ListItems from '../components/ListItems';
import { BackButton } from '../components/Buttons';
import Dictaphone from '../components/Dictaphone';
import { createWord, editWord, removeWord } from '../actions';

class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentWord: {
        name: '',
        definition: '',
        image: ''
      },
      dialogError: false,
      editingDialog: false
    };
  }

  handleWordAdd = () => {
    const { currentWord } = this.state;

    if (currentWord.name === '') return this.setState({ dialogError: true });

    const { dispatch, match } = this.props;
    const { wordbank } = match.params;
    const { name, definition, image } = currentWord;
    const word = { name, definition, image };
    dispatch(createWord(wordbank, word));
    this.setState({
      addingDialog: false,
      currentWord: {
        name: '',
        definition: '',
        image: ''
      }
    });
  };

  handleWordStartEdit = currentWord => {
    this.setState({ editingDialog: true, currentWord: { ...currentWord } });
  };

  handleWordEdit = () => {
    const { currentWord } = this.state;
    const { dispatch } = this.props;

    if (currentWord.name === '') return this.setState({ dialogError: true });

    const { name, definition, image, id } = currentWord;
    const word = { name, definition, image };
    dispatch(editWord(id, word));
    this.setState({ editingDialog: false });
  };

  handleWordRemove = word => {
    const { dispatch } = this.props;
    const { wordBankId, id } = word;
    dispatch(removeWord(wordBankId, id));
  };

  handleDialogChange = (e, field) => {
    const { currentWord } = this.state;
    currentWord[field] = e.target.value;
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
    reader.addEventListener('load', () => changeImage(reader.result), false);
    if (file) reader.readAsDataURL(file);
  };

  render() {
    const {
      addingDialog,
      currentWord,
      dialogError,
      editingDialog
    } = this.state;
    const { match, history, wordbanks, words } = this.props;
    const { wordbank } = match.params;
    if (!wordbanks[wordbank]) console.error('handle non-existent wordbank');
    const wordIds = wordbanks[wordbank] ? wordbanks[wordbank].words : [];
    const wordList = wordIds.map(word => words[word]);
    return (
      <div>
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Word"
          onCancel={this.handleDialogClose}
          onChange={e => this.handleDialogChange(e, 'name')}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordAdd}
          open={addingDialog}
          submitMsg="Add"
          title="Add Word"
          value={currentWord.word}
        >
          <DialogContent>
            <TextField
              value={currentWord.definition}
              margin="dense"
              label="Definition"
              fullWidth
              onChange={e => this.handleDialogChange(e, 'definition')}
            />
          </DialogContent>
          <DialogContent>
            <img
              src={currentWord.image !== '' ? currentWord.image : null}
              style={{ maxHeight: '200px', maxWidth: '200px' }}
              alt="Word"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeImage}
            />
          </DialogContent>
        </ItemDialog>
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Word"
          onCancel={this.handleDialogClose}
          onChange={e => this.handleDialogChange(e, 'name')}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleWordEdit}
          open={editingDialog}
          submitMsg="Change"
          title="Edit Word"
          value={currentWord.name}
        >
          <DialogContent>
            <TextField
              margin="dense"
              label="Definition"
              fullWidth
              onChange={e => this.handleDialogChange(e, 'definition')}
              value={currentWord.definition}
            />
          </DialogContent>
          <DialogContent>
            <img
              src={currentWord.image !== '' ? currentWord.image : null}
              style={{ maxHeight: '200px', maxWidth: '200px' }}
              alt="Word"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeImage}
            />
          </DialogContent>
        </ItemDialog>
        <ListItems
          add={() => this.setState({ addingDialog: true })}
          edit={this.handleWordStartEdit}
          list={wordList}
          name="word"
          remove={this.handleWordRemove}
          title="Word List"
          generateTo={null}
        />
        <BackButton
          variant="fab"
          color="primary"
          aria-label="Back"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 50,
            outline: 'none'
          }}
          onClick={() => history.goBack()}
        />
        <Dictaphone words={words} wordbanks={wordbanks} wordBankId={wordbank} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wordbanks: state.userData.wordbanks,
  words: state.userData.words
});

export default withRouter(connect(mapStateToProps)(Words));
