import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteCollection } from 'utils/delete'

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function removeWordBankImages(snap, context) {
  const { image } = snap.data()
  if (!image) return null
  const { filePath } = image
  if (!filePath) return null

  return Promise.all([
    bucket.file(filePath).delete(),
    deleteCollection(db, 'images', ['fullPath', '==', filePath], 100)
  ])
}

export default functions.firestore
  .document(`wordbanks/{wordbankId}`)
  .onDelete(removeWordBankImages)
