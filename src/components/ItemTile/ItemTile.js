import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

const ItemTile = ({
  name,
  image = 'https://via.placeholder.com/400x400',
  onSelect,
  onDelete,
  showDelete,
  classes
}) => (
  <Card className={classes.root}>
    <CardMedia image={image} className={classes.media} />
    <div className={classes.top}>
      <span className={classes.name} onClick={onSelect}>
        {name || 'No Name'}
      </span>
      {showDelete && onDelete ? (
        <Tooltip title="delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  </Card>
)

ItemTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

ItemTile.defaultProps = {
  showDelete: true
}

export default ItemTile
