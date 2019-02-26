import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'
import { FileUploader } from 'components/FileUploader'

const NewWordDialog = ({ classes, handleSubmit, open, onRequestClose }) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle id="new-word-dialog-title">New Word</DialogTitle>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent>
        <Field
          name="name"
          component={TextField}
          label="Word Name"
          validate={[required]}
        />
        <br />
        <Field
          name="definition"
          component={TextField}
          label="Word Definition"
          validate={[required]}
        />
        <br />
        <FileUploader />
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Create
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)

NewWordDialog.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default NewWordDialog
