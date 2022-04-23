import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'firebaseLib'

export const removeDocument = async (docId: string, path: string) => {
  await deleteDoc(doc(db, path, docId))
}
