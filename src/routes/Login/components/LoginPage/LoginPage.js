import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { SIGNUP_PATH } from 'constants/paths'
import LoginForm from '../LoginForm'

const LoginPage = ({ emailLogin, googleLogin, onSubmitFail, classes }) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
    </Paper>
    <div className={classes.orLabel}>or</div>
    <div className={classes.providers}>
      <GoogleButton onClick={googleLogin} />
    </div>
    <div className={classes.signup}>
      <span className={classes.signupLabel}>Need an account?</span>
      <Link className={classes.signupLink} to={SIGNUP_PATH}>
        Sign Up
      </Link>
    </div>
  </div>
)

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  emailLogin: PropTypes.func.isRequired,
  onSubmitFail: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired
}

export default LoginPage
