import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Modal: React.FC<Props> = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
        <div
          className={`fixed inset-0 bg-black/60 h-screen overflow-y-auto overflow-x-hidden flex items-center justify-center px-4 z-[100] ${
            props.className || ''
          }`}
        >
          {props.children}
        </div>,
        document.querySelector('#modal') as Element
      )
    : null
}

export default Modal
