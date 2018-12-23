import React from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { DeleteButton, EditButton } from './Buttons';

const ListItems = props => {
  const { add, edit, generateTo, list, name, remove, title } = props;

  return (
    <div>
      <Scrollbar
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          top: '80px'
        }}
      >
        <List style={{ width: '100%', position: 'absolute' }}>
          <ListItem divider>
            <ListItemText primary={title} />
          </ListItem>
          <ListItem button onClick={add}>
            <ListItemText primary={`Add a ${name}`} />
          </ListItem>
          {list.map(item => (
            <ListItem button key={item.id}>
              {item.image && (
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    style={{
                      borderRadius: 0,
                      minWidth: '60px',
                      minHeight: '60px'
                    }}
                  />
                </ListItemAvatar>
              )}
              {generateTo ? (
                <Link to={generateTo(item)}>
                  <ListItemText primary={item.name} />
                </Link>
              ) : (
                <ListItemText
                  primary={item.name}
                  secondary={
                    item.definition ? `Definition: ${item.definition}` : ''
                  }
                />
              )}
              <ListItemSecondaryAction>
                <EditButton
                  onClick={() => edit(item)}
                  style={{ outline: 'none' }}
                />
                <DeleteButton
                  onClick={() => remove(item)}
                  style={{ outline: 'none' }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Scrollbar>
    </div>
  );
};

ListItems.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  generateTo: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default ListItems;
