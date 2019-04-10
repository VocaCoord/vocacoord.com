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
  setDisplayName('EnhancedWordsPage'),
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),
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
        { collection: 'words', where },
        { collection: 'classrooms', where }
      ]
    }
  ),
  connect(({ firestore: { ordered: { words, classrooms } } }) => ({
    words,
    classrooms
  })),
  spinnerWhileLoading(['words', 'classrooms']),
  withRouter,
  withNotifications,
  withStateHandlers(
    ({
      initialAddDialogOpen = false,
      initialEditDialogOpen = false,
      initialLogsDialogOpen = false,
      history: { location: { state: { wordbankName = undefined } = {} } = {} }
    }) => ({
      addDialogOpen: initialAddDialogOpen,
      editDialogOpen: initialEditDialogOpen,
      logsDialogOpen: initialLogsDialogOpen,
      selected: {
        name: '',
        definition: '',
        image: ''
      },
      wordbankName
    }),
    {
      toggleAddDialog: ({ addDialogOpen }) => () => ({
        addDialogOpen: !addDialogOpen
      }),
      toggleEditDialog: ({ editDialogOpen }) => word => ({
        editDialogOpen: !editDialogOpen,
        selected: { ...word }
      }),
      toggleLogsDialog: ({ logsDialogOpen }) => () => ({
        logsDialogOpen: !logsDialogOpen
      })
    }
  ),
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
  withStyles(styles)
)
