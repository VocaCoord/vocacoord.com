import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { withHandlers, compose, setPropTypes, setDisplayName } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'
import styles from './SignupPage.styles'

export default compose(
  setDisplayName('EnhancedSignupPage'),
  UserIsNotAuthenticated,
  withNotifications,
  withFirebase,
  setPropTypes({
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      createUser: PropTypes.func.isRequired
    })
  }),
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => e =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailSignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          email: creds.email,
          username: creds.username
        })
        .catch(err => showError(err.message))
  }),
  withStyles(styles)
)
