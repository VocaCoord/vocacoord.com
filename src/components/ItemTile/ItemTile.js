import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Typography, CardActions } from '@material-ui/core'

const ItemTile = ({
  onSelect,
  onDelete,
  showDelete,
  onOpenEdit,
  showEdit,
  classes,
  item
}) => {
  const {
    image: {
      url: image = 'https://via.placeholder.com/400x400.png?text=Add+an+image+here'
    } = {},
    definition,
    name
  } = item
  return (
    <Card className={classes.root}>
      {image && <CardMedia className={classes.media} image={image} />}
      <CardContent className={classes.content}>
        <Typography
          className={classes.name}
          gutterBottom
          variant="h6"
          component="h2"
          onClick={onSelect}>
          {name || 'No Name Given'}
        </Typography>
        <Typography component="p" className={classes.definition}>
          {definition || 'No description given'}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        {showEdit && onOpenEdit ? (
          <Tooltip title="edit" disableFocusListener>
            <IconButton
              onClick={() => onOpenEdit(item)}
              style={{ marginLeft: 'auto' }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {showDelete && onDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </CardActions>
    </Card>
  )
}
ItemTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
  onOpenEdit: PropTypes.func,
  showEdit: PropTypes.bool
}

ItemTile.defaultProps = {
  showDelete: true,
  showEdit: true
}

export default ItemTile
