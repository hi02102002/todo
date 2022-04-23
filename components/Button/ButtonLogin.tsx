import { ClientSafeProvider, signIn } from 'next-auth/react'
import Facebook from 'public/facebook.svg'
import Google from 'public/google.svg'
import React from 'react'
interface Props {
  provider: ClientSafeProvider
  className?: string
}
const ButtonLogin: React.FC<Props> = ({ provider, className }) => {
  return (
    <button
      onClick={() =>
        signIn(provider.id, {
          callbackUrl: '/',
        })
      }
      className={`flex items-center p-[6px] border border-solid border-gray-1 w-full rounded gap-x-2 justify-center hover:bg-white-2 hover:border-gray-2 transition-all ${
        className || ''
      }`}
    >
      {provider.id === 'google' && <Google className="flex-shrink-0 w-4 h-4" />}
      {provider.id === 'facebook' && (
        <Facebook className="flex-shrink-0 w-4 h-4" />
      )}
      <span>Login with {provider.name}</span>
    </button>
  )
}

export default ButtonLogin
