import { compose } from 'redux'
import { connect } from 'react-redux'
import { WORDS_PATH } from 'constants/paths'
import { withHandlers, withStateHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './WordsPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedWordsPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Create listeners based on current users UID
  firestoreConnect(({ params, uid }) => {
    return [
      // Listener for words the current user created
      {
        collection: 'words',
        where: ['createdBy', '==', uid]
      }
    ]
  }),
  // Map words from state to props
  connect(({ firestore: { ordered: { words } } }) => ({ words })),
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
    addWord: props => newInstance => {
      const {
        firestore,
        uid,
        showError,
        showSuccess,
        toggleDialog,
        match: {
          params: { wordbankId = null }
        }
      } = props
      if (!uid) return showError('You must be logged in to create a word')
      return firestore
        .add(
          { collection: 'words' },
          {
            ...newInstance,
            wordbankId,
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Word added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add word')
          return Promise.reject(err)
        })
    },
    deleteWord: props => wordId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'words', doc: wordId })
        .then(() => showSuccess('Word deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete word')
          return Promise.reject(err)
        })
    },
    goToWord: ({ history }) => wordId => {
      history.push(`${WORDS_PATH}/${wordId}`)
    }
  }),
  // Add styles as props.classes
  withStyles(styles)
)
