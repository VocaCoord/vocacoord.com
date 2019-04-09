import { compose } from 'redux'
import { connect } from 'react-redux'
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
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  // This should also be rewritten in conjunction with addWordbank in WordbanksPage.enhancer
  firestoreConnect(
    ({
      params,
      uid,
      match: {
        params: { wordbankId = null }
      }
    }) => {
      const where = [['createdBy', '==', uid]]
      if (wordbankId !== null) where.push(['wordbankId', '==', wordbankId])
      return [
        // Listener for words the current user created
        { collection: 'words', where },
        { collection: 'classrooms', where }
      ]
    }
  ),
  // Map words from state to props
  connect(({ firestore: { ordered: { words, classrooms } } }) => ({
    words,
    classrooms
  })),
  // Show loading spinner while words are loading
  spinnerWhileLoading(['words', 'classrooms']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
  withStateHandlers(
    // Setup initial state
    ({
      initialAddDialogOpen = false,
      initialEditDialogOpen = false,
      history: { location: { state: { wordbankName = undefined } = {} } = {} }
    }) => ({
      addDialogOpen: initialAddDialogOpen,
      editDialogOpen: initialEditDialogOpen,
      selected: {
        name: '',
        definition: '',
        image: ''
      },
      wordbankName
    }),
    // Add state handlers as props
    {
      toggleAddDialog: ({ addDialogOpen }) => () => ({
        addDialogOpen: !addDialogOpen
      }),
      toggleEditDialog: ({ editDialogOpen }) => word => ({
        editDialogOpen: !editDialogOpen,
        selected: { ...word }
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
        toggleAddDialog,
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
          toggleAddDialog()
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
    editWord: props => ({ id: wordId, name, definition, image }) => {
      const { firestore, uid, showError, showSuccess, toggleEditDialog } = props
      if (!uid) return showError('You must be logged in to edit a word')
      return firestore
        .update(`words/${wordId}`, { name, definition, image })
        .then(() => {
          toggleEditDialog()
          showSuccess('Word edited successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not edit word')
          return Promise.reject(err)
        })
    }
  }),
  // Add styles as props.classes
  withStyles(styles)
)
