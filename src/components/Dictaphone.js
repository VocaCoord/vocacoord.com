import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'hoc/withSpeech';
import { Fab } from '@material-ui/core';
import {
  Mic as MicOnIcon,
  MicOff as MicOffIcon,
  Autorenew as ConnectingIcon
} from '@material-ui/icons';
import ClusterWS from 'clusterws-client-js';
import Words from 'routes/Words';

class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      channel: null,
      connecting: true
    };
  }

  openSocket = () => {
    const { classCode } = this.props;
    this.socket = new ClusterWS({
      url: 'wss://temp-vocacoord.herokuapp.com/'
    });
    this.socket.on('connect', () => {
      const channel = this.socket.subscribe(classCode);
      // eslint-disable-next-line react/no-unused-state
      this.setState({ channel, connecting: false });
    });
  };

  closeSocket = () => {
    if (this.socket && this.socket.disconnect) this.socket.disconnect();
  };

  render() {
    const {
      browserSupportsSpeechRecognition,
      listening,
      stopListening,
      startListening
    } = this.props;

    const { connecting } = this.state;

    const disabled = !browserSupportsSpeechRecognition;
    const micIcon = listening ? <MicOnIcon /> : <MicOffIcon />;

    return (
      <Fab
        color={!disabled ? 'primary' : 'default'}
        disabled={disabled}
        onClick={!listening ? startListening : stopListening}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 50,
          outline: 'none'
        }}
      >
        {connecting ? (
          <ConnectingIcon className="classroom--spinner" />
        ) : (
          micIcon
        )}
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
