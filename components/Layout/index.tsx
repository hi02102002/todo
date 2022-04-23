import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import { useResize } from 'hooks'
import React, { useEffect, useState } from 'react'

interface Props {
  children?: React.ReactNode
}

let IS_SHOW: boolean

const Layout: React.FC<Props> = ({ children }) => {
  const { width } = useResize()
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(IS_SHOW || true)

  const handleToggleMenuHamburger = () => {
    setIsShowSidebar(!isShowSidebar)
    IS_SHOW = !isShowSidebar
  }

  useEffect(() => {
    if (width < 768) {
      setIsShowSidebar(false)
      IS_SHOW = false
    } else {
      setIsShowSidebar(true)
      IS_SHOW = true
    }
  }, [width])

  return (
    <div className="flex flex-col h-[100vh]">
      <Header onClickMenuHamburger={handleToggleMenuHamburger} />
      <div className="flex flex-1 w-full h-full">
        <Sidebar
          className={` ${isShowSidebar ? 'left-0' : 'left-[-425px] shadow-md'}`}
        />
        <main
          className={`${
            isShowSidebar ? 'md:ml-[305px]' : 'md:ml-0'
          } flex flex-1 bg-white transition-[margin-left] ease-linear duration-[0.3s] ml-0 py-9 md:px-14 px-[42px]`}
        >
          <div className="max-w-5xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
