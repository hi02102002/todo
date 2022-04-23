import Layout from 'components/Layout'
import TodoListView from 'components/TodoListView'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ITodo, WithLayout } from 'shared'
import { useCollection } from 'swr-firestore-v9'

const ProjectId: WithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const { data: todos, unsubscribe: unsubscribeTodo } = useCollection('todos', {
    listen: true,
    where: [
      //@ts-ignore
      ['userId', '==', session?.user?.id as string],
      ['isCompleted', '==', false],
      ['projectId', '==', id],
    ],
  })
  const { data: porject, unsubscribe: unsubscribeProject } = useCollection(
    'projects',
    {
      listen: true,
      where: [
        //@ts-ignore
        ['userId', '==', session?.user?.id as string],
        ['projectId', '==', id],
      ],
    }
  )

  useEffect(() => {
    return () => {
      unsubscribeTodo && unsubscribeTodo()
    }
  }, [unsubscribeTodo])

  return (
    <div>
      {/* @ts-ignore */}
      <TodoListView todoList={todos as ITodo[]} title={porject?.[0]?.content} />
    </div>
  )
}

ProjectId.auth = true

ProjectId.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ProjectId
