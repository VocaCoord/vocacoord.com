import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import styles from './LogsDialog.styles'

export default compose(
  connect(({ logs }) => {
    const counts = {}
    logs.forEach(({ name }) => (counts[name] = (counts[name] || 0) + 1))
    return {
      logs,
      counts: Object.keys(counts).map(key => `${key} - ${counts[key]}`)
    }
  }),
  withStateHandlers(
    ({ initialShowLogs = true, initialShowCounts = false }) => ({
      showLogs: initialShowLogs,
      showCounts: initialShowCounts
    }),
    {
      toggleView: ({ showLogs, showCounts }) => () => ({
        showLogs: !showLogs,
        showCounts: !showCounts
      })
    }
  ),
  withStyles(styles)
)
