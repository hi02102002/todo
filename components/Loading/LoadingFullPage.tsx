import Logo from 'public/logo.svg'
import React from 'react'
import Spinner from './Spinner'
const LoadingFullPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col fixed w-full h-full inset-0 z-[1000]">
      <Logo className="w-16 h-16 mb-8" />
      <Spinner className="w-6 h-6 text-red-500" />
    </div>
  )
}

export default LoadingFullPage
