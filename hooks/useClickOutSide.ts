import React, { useEffect } from 'react'

export const useClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (e?: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as T)) {
        return
      }
      handler(e)
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handler, ref])
}
