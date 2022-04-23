/* eslint-disable @next/next/no-img-element */
import { ButtonIcon } from 'components/Button'
import { ModalTodo } from 'components/Modal'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Add from 'public/add.svg'
import Hamburger from 'public/hambuger.svg'
import Home from 'public/home.svg'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

interface Props {
  onClickMenuHamburger?: () => void
}

const Header: React.FC<Props> = ({ onClickMenuHamburger }) => {
  const { data, status } = useSession()
  const router = useRouter()
  const [isShowModalCreateTodo, setIsShowModalCreateTodo] =
    useState<boolean>(false)

  return (
    <header className="h-11 w-full flex items-center bg-[#3d3d3d] relative z-50">
      <div className="px-[42px] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <ButtonIcon onClick={onClickMenuHamburger}>
              <Hamburger />
            </ButtonIcon>
            <ButtonIcon
              onClick={() => {
                router.push('/')
              }}
            >
              <Home />
            </ButtonIcon>
          </div>
          <div className="flex items-center gap-x-5">
            <ButtonIcon
              onClick={() => {
                setIsShowModalCreateTodo(true)
              }}
            >
              <Add />
            </ButtonIcon>
            <button>
              {!data && status === 'loading' ? (
                <Skeleton className="w-6 h-6" circle />
              ) : (
                <img
                  src={data?.user?.image as string}
                  alt={data?.user?.name as string}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {isShowModalCreateTodo && (
        <ModalTodo
          onClose={() => {
            setIsShowModalCreateTodo(false)
          }}
        />
      )}
    </header>
  )
}

export default Header
