import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { withHandlers, compose, setPropTypes, setDisplayName } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'
import styles from './LoginPage.styles'

export default compose(
  setDisplayName('EnhancedLoginPage'),
  UserIsNotAuthenticated,
  withNotifications,
  withFirebase,
  setPropTypes({
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }),
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError, router }) => event =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailLogin: ({ firebase, router, showError }) => creds =>
      firebase.login(creds).catch(err => showError(err.message))
  }),
  withStyles(styles, { withTheme: true })
)
