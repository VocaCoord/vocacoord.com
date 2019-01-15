import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import ClusterWS from 'clusterws-client-js';
import Scrollbar from 'react-scrollbars-custom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import '../../VocaCoord.css';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCode: '',
      joining: false,
      inClass: false,
      words: [],
      selectedWord: {
        name: ''
      }
    };
  }

  handleJoin = () => {
    this.setState({ joining: true });

    const { classCode } = this.state;
    if (classCode.length !== 4) return this.setState({ joining: false });
    this.socket = new ClusterWS({
      url: 'wss://temp-vocacoord.herokuapp.com/'
    });
    this.socket.on('connect', () => {
      this.channel = this.socket
        .subscribe(classCode.toUpperCase())
        .watch(wordSaid => {
          const { name } = wordSaid;
          /* eslint-disable react/destructuring-assignment */
          /* eslint-disable react/no-access-state-in-setstate */
          let words = [...this.state.words];
          const word = words.find(w => w.name === name) || {
            ...wordSaid,
            count: 0
          };
          word.count += 1;
          words = words.filter(w => w.name !== name);
          words.unshift(word);
          this.setState({ words });
        });
    });

    this.setState({ inClass: true });
  };

  render() {
    const { classCode, joining, inClass, words, selectedWord } = this.state;
    return (
      <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px - 40px)',
          top: '80px',
          position: 'absolute'
        }}
      >
        {inClass ? (
          <div style={{ height: '100%' }}>
            <div
              className="student--images"
              style={{
                width: '50%',
                height: '60%',
                left: '0px',
                position: 'relative'
              }}
            >
              <img
                src={selectedWord.image}
                alt=""
                style={{
                  margin: 'auto',
                  top: '0',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  position: 'absolute'
                }}
              />
            </div>
            <div
              className="student--definition"
              style={{
                width: '50%',
                height: '40%',
                left: '0px',
                top: '60%',
                position: 'absolute'
              }}
            >
              {selectedWord.name && selectedWord.name !== '' ? (
                <div>
                  <h2>Definition of {selectedWord.name}:</h2>
                  <br />
                  <h3>{selectedWord.definition}</h3>
                </div>
              ) : null}
            </div>
            <Scrollbar
              style={{
                width: '50%',
                height: '100%',
                left: '50%',
                top: '0px',
                position: 'absolute'
              }}
            >
              <List style={{ width: '100%' }}>
                {words.map(word => (
                  <ListItem
                    button
                    key={word.id}
                    onClick={() => this.setState({ selectedWord: word })}
                  >
                    <ListItemText primary={word.name} />
                  </ListItem>
                ))}
              </List>
            </Scrollbar>
          </div>
        ) : (
          <div>
            <Input
              placeholder="Class Code"
              align="center"
              className="student"
              value={classCode}
              onChange={e => this.setState({ classCode: e.target.value })}
            />
            {joining ? (
              <div className="student student__spinner">
                <PulseLoader color="blue" />
              </div>
            ) : (
              <Button
                block
                color="primary"
                onClick={() => this.handleJoin()}
                className="student student__button"
              >
                Join Class
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Student;
