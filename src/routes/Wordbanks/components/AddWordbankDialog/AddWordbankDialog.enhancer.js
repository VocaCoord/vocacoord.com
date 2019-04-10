import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { ADD_WORDBANK_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './AddWordbankDialog.styles'

export default compose(
  reduxForm({
    form: ADD_WORDBANK_FORM_NAME,
    onSubmitSuccess: (result, dispatch, props) => props.reset()
  }),
  withStyles(styles)
)
