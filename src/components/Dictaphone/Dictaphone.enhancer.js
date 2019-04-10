import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import styles from './Dictaphone.styles'

export default compose(
  connect(),
  withStyles(styles)
)
