import Layout from 'components/Layout'
import TodoListView from 'components/TodoListView'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import { WithLayout } from 'shared'
import { useCollection } from 'swr-firestore-v9'

const Next7Days: WithLayout = () => {
  const { data: session } = useSession()
  const { data: todos } = useCollection('todos', {
    listen: true,
    where: [
      //@ts-ignore
      ['userId', '==', session?.user?.id as string],
      ['type', '==', 'NEXT_7_DAY'],
      ['isCompleted', '==', false],
    ],
  })
  return (
    <div>
      <Head>
        <title>Next 7 days: Todolist</title>
        <meta name="description" content="The Next 7 days page todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore */}
      <TodoListView todoList={todos} title="Next 7 days" />
    </div>
  )
}

Next7Days.auth = true

Next7Days.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Next7Days
