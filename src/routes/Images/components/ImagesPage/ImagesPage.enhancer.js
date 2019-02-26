import { compose } from 'redux'
import { connect } from 'react-redux'
import { IMAGES_PATH } from 'constants/paths'
import { withHandlers, withStateHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './ImagesPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedImagesPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(({ params, uid }) => [
    // Listener for images the current user created
    {
      collection: 'images',
      where: ['createdBy', '==', uid]
    }
  ]),
  // Map images from state to props
  connect(({ firestore: { ordered: { images } } }) => ({ images })),
  // Show loading spinner while images are loading
  spinnerWhileLoading(['images']),
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
    addImage: props => newInstance => {
      const { firestore, uid, showError, showSuccess, toggleDialog } = props
      if (!uid) return showError('You must be logged in to create an image')
      return firestore
        .add(
          { collection: 'images' },
          {
            ...newInstance,
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Image added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add image')
          return Promise.reject(err)
        })
    },
    deleteImage: props => imageId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'images', doc: imageId })
        .then(() => showSuccess('Image deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete image')
          return Promise.reject(err)
        })
    },
    goToImage: ({ history }) => imageId => {
      history.push(`${IMAGES_PATH}/${imageId}`)
    }
  }),
  // Add styles as props.classes
  withStyles(styles)
)
