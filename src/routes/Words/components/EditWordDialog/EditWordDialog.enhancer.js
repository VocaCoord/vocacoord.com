import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { EDIT_WORD_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './EditWordDialog.styles'

export default compose(
  reduxForm({
    form: EDIT_WORD_FORM_NAME,
    // Clear the form for future use (creating another word)
    onSubmitSuccess: (result, dispatch, props) => props.reset(),
    enableReinitialize: true
  }),
  withStyles(styles)
)
