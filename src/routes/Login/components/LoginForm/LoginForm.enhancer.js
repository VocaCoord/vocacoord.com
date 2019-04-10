import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { reduxForm } from 'redux-form'
import { LOGIN_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './LoginForm.styles'

export default compose(
  setPropTypes({
    onSubmit: PropTypes.func.isRequired
  }),
  reduxForm({
    form: LOGIN_FORM_NAME
  }),
  withStyles(styles)
)
