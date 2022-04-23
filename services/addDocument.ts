import { addDoc, collection } from 'firebase/firestore'
import { db } from 'firebaseLib'

export const addDocument = async (path: string, data: any) => {
  return await addDoc(collection(db, path), {
    ...data,
  })
}
