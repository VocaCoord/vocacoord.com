import React from 'react'
import PropTypes from 'prop-types'
import Add from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }

const NewItemTile = ({ onClick, classes }) => (
  <Paper className={classes.root} onClick={onClick}>
    <Add style={iconStyle} color="primary" />
  </Paper>
)

NewItemTile.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NewItemTile
