import { getSession } from 'next-auth/react'
import React from 'react'

const AuthProtect: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  return <>{children}</>
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    }, // will be passed to the page component as props
  }
}

export default AuthProtect
