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

const AddWordDialog = ({ classes, handleSubmit, open, onRequestClose }) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle id="add-word-dialog-title">
      <b>Create A New Word</b>
    </DialogTitle>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div style={{ display: 'flex' }}>
          <Field
            style={{ flex: '1', paddingRight: '20px' }}
            name="name"
            component={TextField}
            label="Word Name"
            validate={[required]}
          />
          <Field
            style={{ flex: '1' }}
            name="definition"
            component={TextField}
            label="Word Definition"
            validate={[required]}
          />
        </div>
        <br />
        <br />
        <Field name="image" component={FileUploader} />
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

AddWordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default AddWordDialog
