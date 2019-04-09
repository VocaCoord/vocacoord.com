import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setPropTypes } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import uuid from 'uuid/v4'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import './style.css'

const enhancerPropTypes = {
  firebase: PropTypes.object.isRequired
}

const enhance = compose(
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ filesPath: uid })),
  // Create listeners for Real Time Database which write to redux store
  firebaseConnect(({ filesPath }) => [{ path: filesPath }]),
  // Set proptypes of props used within handlers
  setPropTypes(enhancerPropTypes)
)

const uppyConfig = {
  id: 'uppy',
  autoProceed: false,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: 10 * 1000 * 1000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1
  }
}

function FirebaseUploader(uppy, { input: { onChange }, filesPath, firebase }) {
  const uploadFile = fileId => {
    const file = uppy.getFile(fileId)
    const blob = file.data.slice(0, -1)
    const name = uuid()
    const fileData = new File([blob], name, { type: file.type })

    firebase
      .uploadFile(filesPath, fileData, 'images', { progress: true })
      .then(({ uploadTaskSnapshot: snapshot }) => {
        uppy.emit('upload-success', file, snapshot)
        snapshot.ref
          .getDownloadURL()
          .then(url => onChange({ url, filePath: `${filesPath}/${name}` }))
      })
      .catch(e => uppy.emit('upload-error', file, e))
  }
  return {
    type: 'uploader',
    id: 'FirebaseUploader',
    uploadFile,
    install: () => uppy.addUploader(uploadFile),
    uninstall: () => uppy.removeUploader(uploadFile),
    update: () => {}
  }
}

class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.uppy = Uppy(uppyConfig).use(FirebaseUploader, props)
  }

  render() {
    return (
      <Dashboard uppy={this.uppy} inline proudlyDisplayPoweredByUppy={false} />
    )
  }
}

export default enhance(Uploader)
