import { ReactElement, ReactNode } from 'react'
export interface IProject {
  color: {
    name: string
    code: string
  }
  content: string
  id?: string
  projectId: string
  userId: string
}

export interface ITodo {
  title: string
  todoId: string
  isCompleted: boolean
  description?: string
  id?: string
  filterId?: string
  projectId?: string
  type?: 'TODAY' | 'NEXT_7_DAY'
  userId: string
}

export type WithLayout = {
  getLayout?: (page: ReactElement) => ReactNode
  auth?: boolean
}
