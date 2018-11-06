import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import PropTypes from "prop-types";

export const ItemDialog = props => {
  const {
    children,
    error,
    errorMsg,
    label,
    onCancel,
    onChange,
    onClickOut,
    onSubmit,
    open,
    submitMsg,
    text,
    title
  } = props;
  return (
    <Dialog
      open={open}
      onBackdropClick={() => onClickOut()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={label}
          fullWidth
          onChange={e => onChange(e)}
          error={error}
          helperText={error ? errorMsg : ""}
        />
      </DialogContent>
      {children}
      <DialogActions>
        <Button onClick={() => onCancel()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit()} color="primary">
          {submitMsg}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ItemDialog.propTypes = {
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  label: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickOut: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submitMsg: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired
};
