import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DeleteButton, EditButton } from "./Buttons.js";
import PropTypes from "prop-types";

const ListItems = props => {
  const { edit, generateTo, list, missing, remove, title } = props;

  return (
    <div>
      {list.length ? (
        <List>
          <ListItem divider>
            <ListItemText primary={title} />
          </ListItem>
          {list.map((item, i) => {
            return (
              <ListItem button key={i}>
                {item.image && (
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      style={{
                        borderRadius: 0,
                        minWidth: "60px",
                        minHeight: "60px"
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
                      item.definition ? `Definition: ${item.definition}` : ""
                    }
                  />
                )}
                <ListItemSecondaryAction>
                  <EditButton
                    onClick={() => edit(item)}
                    style={{ outline: "none" }}
                  />
                  <DeleteButton
                    onClick={() => remove(item)}
                    style={{ outline: "none" }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <p
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)"
          }}
        >
          {missing}
        </p>
      )}
    </div>
  );
};

ListItems.propTypes = {
  edit: PropTypes.func.isRequired,
  generateTo: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  missing: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default ListItems;
