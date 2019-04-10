export const metaDataConfig = {
  fileMetadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
    const { cacheControl, contentLanguage, customMetadata, ...rest } = metadata
    const createdBy = firebase.auth().currentUser.uid
    return {
      ...rest,
      downloadURL,
      createdBy
    }
  }
}
