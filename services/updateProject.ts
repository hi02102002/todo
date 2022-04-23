import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseLib'

export const updateProject = async (projectId: string, data: any) => {
  console.log({ projectId, data })
  await updateDoc(doc(db, 'projects', projectId), {
    ...data,
  })
}
