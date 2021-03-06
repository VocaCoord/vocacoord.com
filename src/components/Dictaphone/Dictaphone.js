import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import { Fab } from '@material-ui/core'
import {
  Mic as MicOnIcon,
  MicOff as MicOffIcon,
  Autorenew as ConnectingIcon
} from '@material-ui/icons'
import ClusterWS from 'clusterws-client-js'
import actions from 'modules/logging'
import './Dictaphone.css'

class Dictaphone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      lastSpeech: '',
      // eslint-disable-next-line react/no-unused-state
      channel: null,
      connecting: true,
      logs: []
    }
  }

  componentDidMount() {
    this.openSocket()
  }

  componentWillUnmount() {
    this.closeSocket()
    const { stopListening } = this.props
    if (stopListening) stopListening()
  }

  static getDerivedStateFromProps = (props, state) => {
    const { interimTranscript: nextSpeech, resetSpeech, dispatch } = props
    const { lastSpeech = '', channel } = state
    const lastWords = lastSpeech.toLowerCase().split(' ')
    const nextWords = nextSpeech.toLowerCase().split(' ')

    const words = props.words.map(word => word.name.toLowerCase()) || []

    nextWords.forEach((nextWord, i) => {
      if (lastWords[i] === nextWord) return
      const wordIndex = words.indexOf(nextWord)
      if (wordIndex !== -1) {
        const word = props.words[wordIndex]
        const { name } = word
        dispatch(actions.addLog({ name }))
        if (channel) channel.publish(word)
      }
    })

    if (resetSpeech) resetSpeech()

    return { lastSpeech: nextSpeech }
  }

  openSocket = () => {
    const { classCode } = this.props
    this.socket = new ClusterWS({
      url: 'wss://temp-vocacoord.herokuapp.com/'
    })
    this.socket.on('connect', () => {
      const channel = this.socket.subscribe(classCode)
      // eslint-disable-next-line react/no-unused-state
      this.setState({ channel, connecting: false })
    })
  }

  closeSocket = () => {
    if (this.socket && this.socket.disconnect) this.socket.disconnect()
  }

  render() {
    const {
      browserSupportsSpeechRecognition,
      listening,
      stopListening,
      startListening
    } = this.props

    const { connecting } = this.state

    const disabled = !browserSupportsSpeechRecognition
    const micIcon = listening ? <MicOnIcon /> : <MicOffIcon />

    return (
      <Fab
        color={!disabled ? 'primary' : 'default'}
        disabled={disabled || connecting}
        onClick={!listening ? startListening : stopListening}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          outline: 'none'
        }}>
        {connecting ? <ConnectingIcon className="spinner" /> : micIcon}
      </Fab>
    )
  }
}

const options = {
  autoStart: false
}

Dictaphone.defaultProps = {
  browserSupportsSpeechRecognition: false
}

Dictaphone.propTypes = {
  browserSupportsSpeechRecognition: PropTypes.bool
}

export default SpeechRecognition(options)(Dictaphone)
