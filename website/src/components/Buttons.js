import React from 'react';
import { Button } from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';

export const AddButton = props => (
  <Button {...props}>
    <AddIcon />
  </Button>
);

export const BackButton = props => (
  <Button {...props}>
    <ArrowBackIcon />
  </Button>
);

export const DeleteButton = props => (
  <Button {...props}>
    <DeleteIcon />
  </Button>
);

export const EditButton = props => (
  <Button {...props}>
    <EditIcon />
  </Button>
);
