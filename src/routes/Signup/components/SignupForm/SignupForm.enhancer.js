import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { setPropTypes, compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { SIGNUP_FORM_NAME } from 'constants/formNames'
import styles from './SignupForm.styles'

export default compose(
  setPropTypes({
    onSubmit: PropTypes.func.isRequired
  }),
  reduxForm({
    form: SIGNUP_FORM_NAME
  }),
  withStyles(styles)
)
