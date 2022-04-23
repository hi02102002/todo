import { ButtonLogin } from 'components/Button'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
} from 'next-auth/react'
import React from 'react'
import TodoList from '../public/todolist.svg'

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const Login: React.FC<Props> = ({ providers }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="my-[50px] w-full max-w-[452px] bg-white h-full border border-solid border-gray-1 rounded">
        <div className="p-[25px]">
          <TodoList className="w-24 h-[25px] mb-5" />
          <h2 className="text-[26px] font-bold mb-[30px]">Login</h2>
          <div className="flex flex-col ">
            {Object.values(providers).map((item) => {
              return (
                <ButtonLogin
                  key={item.id}
                  provider={item}
                  className="mb-[10px] last:mb-0"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

export async function getServerSideProps(ctx: any) {
  const providers = (await getProviders()) as Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >

  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers,
      session,
    },
  }
}
