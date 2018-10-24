import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'

export default class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classrooms: [{
        className: 'testing'
      }]
    }
  }
  
  render() {
    return (
      <div>
        {this.state.classrooms.length ? (
          this.state.classrooms.map((classroom, i) => {
            return (
              <Link
                key={i}
                to={`/classrooms/${classroom.className.replace(/\s/g, '-')}/wordbanks`}
              >
                <ListItem button>
                  <ListItemText primary={classroom.className} />
                </ListItem>
              </Link>
            )
          })
        ) : (
          <p>It looks like you don't have any classrooms added yet,{'\n'}
            create one on the app to get started</p>
        )}
      </div>
    )
  }
}