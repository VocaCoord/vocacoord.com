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
  setDisplayName('EnhancedWordbanksPage'),
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'wordbanks',
      where: ['createdBy', '==', uid]
    }
  ]),
  connect(({ firestore: { ordered: { wordbanks } } }) => ({ wordbanks })),
  spinnerWhileLoading(['wordbanks']),
  withRouter,
  withNotifications,
  withStateHandlers(
    ({ initialAddDialogOpen = false, initialEditDialogOpen = false }) => ({
      addDialogOpen: initialAddDialogOpen,
      editDialogOpen: initialEditDialogOpen,
      selected: {
        name: '',
        definition: ''
      }
    }),
    {
      toggleAddDialog: ({ addDialogOpen }) => () => ({
        addDialogOpen: !addDialogOpen
      }),
      toggleEditDialog: ({ editDialogOpen }) => wordbank => ({
        editDialogOpen: !editDialogOpen,
        selected: { ...wordbank }
      })
    }
  ),
  withHandlers({
    addWordbank: props => async newInstance => {
      const { firestore, uid, showError, showSuccess, toggleAddDialog } = props
      if (!uid) return showError('You must be logged in to create a wordbank')
      const wordbankId = await firestore
        .add(
          { collection: 'wordbanks' },
          {
            ...newInstance,
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(({ id }) => id)
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add wordbank')
          return Promise.reject(err)
        })

      const classroomId = await firestore
        .collection('classrooms')
        .get()
        .then(snapshot => {
          let classroomId = ''
          const classroomIds = []
          snapshot.forEach(doc => classroomIds.push(doc.data().classCode))
          do {
            classroomId = Math.random()
              .toString(36)
              .substring(2, 6)
              .toUpperCase()
          } while (classroomIds.includes(classroomId))
          return classroomId
        })
      return firestore
        .add(
          { collection: 'classrooms' },
          {
            classCode: classroomId,
            wordbankId,
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleAddDialog()
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
    editWordbank: props => ({ id: wordbankId, name, definition, image }) => {
      const { firestore, uid, showError, showSuccess, toggleEditDialog } = props
      if (!uid) return showError('You must be logged in to edit a word')
      return firestore
        .update(`wordbanks/${wordbankId}`, { name, definition, image })
        .then(() => {
          toggleEditDialog()
          showSuccess('Wordbank edited successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not edit word')
          return Promise.reject(err)
        })
    },
    goToWords: ({ history }) => ({ id: wordbankId, name: wordbankName }) =>
      history.push(`${WORDBANKS_PATH}/${wordbankId}`, { wordbankName })
  }),
  withStyles(styles)
)
