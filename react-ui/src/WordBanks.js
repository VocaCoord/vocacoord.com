import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';


export class WordBanks extends Component {
  constructor(props) {
    super(props);
    const { wordbanks } = props.location.state;
    this.state = {
      wordbanks
    }
  }
  
  render() {
    return (
      <div>
        {this.state.wordbanks.length ? (
          this.state.wordbanks.map((wordbank, i) => {
            return (
              <Link 
                key={i}
                to={{
                  pathname: `${this.props.location.pathname}/words`,
                  state: { wordbank }
                }}
              >
                <ListItem button>
                  <ListItemText primary={wordbank.name} />
                </ListItem>
              </Link>
            )
          })
        ) : (
          <p>It looks like you don't have any wordbanks added yet,{'\n'}
            click the add button to start adding wordbanks</p>
        )}
      </div>
    )
  }
}

export class WordBank extends Component {
  constructor(props) {
    super(props);
    const { wordbank } = props.location.state;
    this.state = {
      wordbank
    }
  }
  
  render() {
    return (
      <div>
        {this.state.wordbank.words.length ? (
          this.state.wordbank.words.map((word, i) => {
            return (
              <ListItem key={i}>
                <ListItemText primary={word} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        ) : (
          <p>It looks like you don't have any words added yet,{'\n'}
            click the add button to start adding words</p>
        )}
      </div>
    )
  }
}