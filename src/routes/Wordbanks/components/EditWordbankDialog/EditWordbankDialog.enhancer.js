import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { EDIT_WORDBANK_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './EditWordbankDialog.styles'

export default compose(
  reduxForm({
    form: EDIT_WORDBANK_FORM_NAME,
    // Clear the form for future use (creating another word)
    onSubmitSuccess: (result, dispatch, props) => props.reset(),
    enableReinitialize: true
  }),
  withStyles(styles)
)
