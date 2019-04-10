import React from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'react-scrollbars-custom'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import SwitchIcon from '@material-ui/icons/Cached'

const LogsDialog = ({
  classes,
  open,
  onRequestClose,
  logs,
  counts,
  showLogs,
  showCounts,
  toggleView
}) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle disableTypography className={classes.titleContainer}>
      <Typography variant="h3" className={classes.titleText}>
        Session Stats
      </Typography>
      <IconButton onClick={toggleView} className={classes.switchButton}>
        <SwitchIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ paddingTop: '0', paddingBottom: '0' }}>
      <Scrollbar className={classes.scrollbar}>
        {showLogs &&
          logs.map(({ name, time }, i) => {
            const formattedTime = new Date(time).toLocaleString()
            return (
              <Typography key={`${time}-${i}`} variant="h5">
                {formattedTime} - {name}
              </Typography>
            )
          })}
        {showCounts &&
          counts.map(count => (
            <Typography key={count} variant="h5">
              {count}
            </Typography>
          ))}
      </Scrollbar>
    </DialogContent>
  </Dialog>
)

LogsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default LogsDialog
