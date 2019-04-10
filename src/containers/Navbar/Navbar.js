import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { WORDBANKS_PATH } from 'constants/paths'
import { VCLogo } from 'components/Icons'
import AccountMenu from './AccountMenu'
import LoginMenu from './LoginMenu'

export const Navbar = ({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  handleLogout,
  closeAccountMenu,
  anchorEl,
  handleMenu,
  classes
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.flex}
        component={Link}
        to={authExists ? WORDBANKS_PATH : '/'}>
        <div className={classes.logo}>
          <VCLogo />
        </div>
      </Typography>
      {authExists ? (
        <AccountMenu
          avatarUrl={avatarUrl}
          displayName={displayName}
          onLogoutClick={handleLogout}
          goToAccount={goToAccount}
          closeAccountMenu={closeAccountMenu}
          handleMenu={handleMenu}
          anchorEl={anchorEl}
        />
      ) : (
        <LoginMenu />
      )}
    </Toolbar>
  </AppBar>
)

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  authExists: PropTypes.bool,
  goToAccount: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  closeAccountMenu: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.object
}

export default Navbar
