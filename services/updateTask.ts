import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseLib'

export const updateTask = async (docId: string, data: any) => {
  await updateDoc(doc(db, 'todos', docId), {
    ...data,
  })
}
