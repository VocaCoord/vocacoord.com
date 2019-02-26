import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Route } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'

const ImagesPage = ({
  images,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteImage,
  addImage,
  classes,
  match,
  goToImage
}) => (
  <Route
    exact
    path={match.path}
    render={() => (
      <Scrollbar className={classes.scrollbar}>
        <div className={classes.root}>
          <div className={classes.tiles}>
            <NewItemTile onClick={toggleDialog} />
            {!isEmpty(images) &&
              images.map((image, i) => (
                <ItemTile
                  key={`Image-${image.id}-${i}`}
                  name={image.name}
                  image={image.downloadURL}
                  onSelect={() => goToImage(image.id)}
                  onDelete={() => deleteImage(image.id)}
                />
              ))}
          </div>
        </div>
      </Scrollbar>
    )}
  />
)

ImagesPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  images: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deleteImage: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  addImage: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  goToImage: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default ImagesPage
