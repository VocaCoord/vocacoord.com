import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { compose, withHandlers, setPropTypes } from 'recompose'
import { firebaseConnect, getFirebase } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

// Path within Database for metadata (also used for file Storage path)
const firebase = getFirebase()
const filesPath = firebase.auth().currentUser.uid

const handlers = {
  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop: props => files => {
    // uploadFiles(storagePath, files, dbPath)
    return props.firebase.uploadFiles(filesPath, files, 'images')
  },
  onFileDelete: props => (file, key) => {
    // deleteFile(storagePath, dbPath)
    return props.firebase.deleteFile(file.fullPath, `${key}`)
  }
}

const enhancerPropsTypes = {
  firebase: PropTypes.object.isRequired
}

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
const enhance = compose(
  // Create listeners for Real Time Database which write to redux store
  firebaseConnect([{ path: filesPath }]),
  // connect redux state to props
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath]
  })),
  // Set proptypes of props used within handlers
  setPropTypes(enhancerPropsTypes),
  // Add handlers as props
  withHandlers(handlers)
)

const Uploader = ({ uploadedFiles, onFileDelete, onFilesDrop }) => (
  <div>
    <Dropzone onDrop={onFilesDrop} accept="image/*">
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop files here...</p>
            ) : (
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
            )}
          </div>
        )
      }}
    </Dropzone>
    {uploadedFiles && (
      <div>
        <h3>Uploaded image:</h3>
        {map(uploadedFiles, (file, key) => (
          <div key={file.name + key}>
            <span>{file.name}</span>
            <button onClick={() => onFileDelete(file, key)}>Delete File</button>
          </div>
        ))}
      </div>
    )}
  </div>
)

Uploader.propTypes = {
  firebase: PropTypes.object.isRequired,
  uploadedFiles: PropTypes.object
}

export default enhance(Uploader)
