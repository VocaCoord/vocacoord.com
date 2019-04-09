import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteCollection } from '/utils/delete'

const db = admin.firestore()

async function removeWordsEvent(snap, context) {
  const { wordbankId } = context.params
  const dbQuery = ['wordbankId', '==', wordbankId]
  return deleteCollection(db, 'classrooms', dbQuery, 100)
}

export default functions.firestore
  .document(`wordbanks/{wordbankId}`)
  .onDelete(removeWordsEvent)
