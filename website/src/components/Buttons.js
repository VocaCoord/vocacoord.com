import React from "react";
import { Button } from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@material-ui/icons";

export const AddButton = props => {
  return (
    <Button {...props}>
      <AddIcon />
    </Button>
  );
};

export const DeleteButton = props => {
  return (
    <Button {...props}>
      <DeleteIcon />
    </Button>
  );
};

export const EditButton = props => {
  return (
    <Button {...props}>
      <EditIcon />
    </Button>
  );
};
