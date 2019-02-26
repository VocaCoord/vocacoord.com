import { compose } from 'redux'
import { connect } from 'react-redux'
import { WORDBANKS_PATH } from 'constants/paths'
import { withHandlers, withStateHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './WordbanksPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedWordbanksPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(({ params, uid }) => [
    // Listener for wordbanks the current user created
    {
      collection: 'wordbanks',
      where: ['createdBy', '==', uid]
    }
  ]),
  // Map wordbanks from state to props
  connect(({ firestore: { ordered: { wordbanks } } }) => ({ wordbanks })),
  // Show loading spinner while wordbanks are loading
  spinnerWhileLoading(['wordbanks']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
  withStateHandlers(
    // Setup initial state
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    // Add state handlers as props
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  // Add handlers as props
  withHandlers({
    addWordbank: props => newInstance => {
      const { firestore, uid, showError, showSuccess, toggleDialog } = props
      if (!uid) return showError('You must be logged in to create a wordbank')
      return firestore
        .add(
          { collection: 'wordbanks' },
          {
            ...newInstance,
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Wordbank added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add wordbank')
          return Promise.reject(err)
        })
    },
    deleteWordbank: props => wordbankId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'wordbanks', doc: wordbankId })
        .then(() => showSuccess('Wordbank deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete wordbank')
          return Promise.reject(err)
        })
    },
    goToWords: ({ history }) => wordbankId => {
      history.push(`${WORDBANKS_PATH}/${wordbankId}`)
    }
  }),
  // Add styles as props.classes
  withStyles(styles)
)
