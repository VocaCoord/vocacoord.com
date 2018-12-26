import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Fab } from '@material-ui/core';
import { Mic as MicOnIcon, MicOff as MicOffIcon } from '@material-ui/icons';

class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      lastSpeech: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { interimTranscript: nextSpeech, resetSpeech } = props;
    const { lastSpeech = '' } = state;
    const lastWords = lastSpeech.toLowerCase().split(' ');
    const nextWords = nextSpeech.toLowerCase().split(' ');

    const { wordbanks, words, wordBankId } = props;
    const wordIds = wordbanks[wordBankId] ? wordbanks[wordBankId].words : [];
    const wordbank = wordIds.map(wordId => words[wordId]);
    const wordBankWords = wordbank.map(word => word.name.toLowerCase());

    nextWords.forEach((nextWord, i) => {
      if (lastWords[i] === nextWord) return;
      const wordIndex = wordBankWords.indexOf(nextWord);
      if (wordIndex !== -1) console.error('publishing', wordbank[wordIndex]);
    });

    if (resetSpeech) resetSpeech();

    return { lastSpeech: nextSpeech };
  }

  render() {
    const {
      browserSupportsSpeechRecognition,
      listening,
      stopListening,
      startListening
    } = this.props;

    const disabled = !browserSupportsSpeechRecognition;

    return (
      <Fab
        color={!disabled ? 'primary' : 'default'}
        disabled={disabled}
        onClick={!listening ? startListening : stopListening}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          outline: 'none'
        }}
      >
        {disabled || listening ? <MicOffIcon /> : <MicOnIcon />}
      </Fab>
    );
  }
}

const options = {
  autoStart: false
};

Dictaphone.defaultProps = {
  browserSupportsSpeechRecognition: false
};

Dictaphone.propTypes = {
  browserSupportsSpeechRecognition: PropTypes.bool
};

export default SpeechRecognition(options)(Dictaphone);
