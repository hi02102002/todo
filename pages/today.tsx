import Layout from 'components/Layout'
import TodoListView from 'components/TodoListView'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import { WithLayout } from 'shared'
import { useCollection } from 'swr-firestore-v9'

const Today: WithLayout = () => {
  const { data: session } = useSession()
  const { data: todos } = useCollection('todos', {
    listen: true,
    where: [
      //@ts-ignore
      ['userId', '==', session?.user?.id as string],
      ['type', '==', 'TODAY'],
      ['isCompleted', '==', false],
    ],
  })

  return (
    <div>
      <Head>
        <title>Today: Todolist</title>
        <meta name="description" content="The today page todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore */}
      <TodoListView todoList={todos} title="Today" />
    </div>
  )
}

Today.auth = true

Today.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Today
