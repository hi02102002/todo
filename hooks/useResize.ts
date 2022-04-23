import { useEffect, useState } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])
  return { width, height }
}
