import Layout from 'components/Layout'
import TodoListView from 'components/TodoListView'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ITodo, WithLayout } from 'shared'
import { useCollection } from 'swr-firestore-v9'

const Home: NextPage & WithLayout = () => {
  const { data: session } = useSession()
  const { data: todos } = useCollection('todos', {
    listen: true,
    where: [
      //@ts-ignore
      ['userId', '==', session?.user?.id as string],
      ['isCompleted', '==', false],
    ],
  })

  return (
    <>
      <Head>
        <title>Inbox: Todolist</title>
        <meta name="description" content="The homepage todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* @ts-ignore */}
        <TodoListView todoList={todos as ITodo[]} title="Inbox" />
      </div>
    </>
  )
}

Home.auth = true
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
