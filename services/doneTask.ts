import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseLib'

export const doneTask = async (todoDocId: string) => {
  const ref = doc(db, 'todos', todoDocId)
  await updateDoc(ref, {
    isCompleted: true,
  })
}
