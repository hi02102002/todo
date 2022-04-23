import { Button, ButtonIcon } from 'components/Button'
import IconCalendar from 'components/IconCalendar'
import ModalCreateProject from 'components/Modal/ModalProject'
import { SIDEBAR_LIST } from 'constant'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Add from 'public/add.svg'
import ArrowDown from 'public/arrowDown.svg'
import Dots from 'public/dots.svg'
import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { usePopper } from 'react-popper'
import { removeDocument } from 'services'
import { IProject } from 'shared'
import { useCollection } from 'swr-firestore-v9'

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {}

const Sidebar: React.FC<Props> = ({ className, ...props }) => {
  const router = useRouter()
  const expandRef = useRef<HTMLUListElement | null>(null)
  const [heightExpand, setHeightExpand] = useState<number>(0)
  const [isShowExpand, setIsShowExpand] = useState<boolean>(false)
  const { data: session } = useSession()
  const { data: projects, unsubscribe } = useCollection(`projects`, {
    listen: true,
    //@ts-ignore
    where: ['userId', '==', session?.user?.id as string],
  })
  const [showModalCreateProject, setShowModalCreateProject] =
    useState<boolean>(false)
  const sidebarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isShowExpand && expandRef.current) {
      setHeightExpand(expandRef.current.scrollHeight as number)
    } else {
      setHeightExpand(0)
    }
  }, [isShowExpand, projects])

  useEffect(() => {
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [unsubscribe])

  return (
    <aside
      className={`fixed h-[calc(100vh_-_44px)]  w-[305px] bg-neutral-50 transition-[left]  ease-linear duration-[0.3s] z-50  ${
        className || ''
      }`}
      {...props}
      ref={sidebarRef}
    >
      <div className="pt-[30px] pl-[35px] mr-1">
        <ul className="flex flex-col gap-y-1 ">
          {SIDEBAR_LIST.map((item) => {
            return (
              <li key={item.name}>
                <Link href={item.path}>
                  <a
                    className={`flex items-center p-[5px] pr-4 gap-x-[5px] rounded hover:bg-white-3 transition-all ${
                      item.path === router.pathname ? 'bg-white-3' : ''
                    }`}
                  >
                    {item.name === 'Today' ? (
                      <IconCalendar color={item.color} />
                    ) : (
                      <item.icon color={item.color} className="w-6 h-6" />
                    )}
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
        <div>
          <div className="flex items-center justify-between py-[10px] px-[5px] pr-4">
            <button
              className="flex items-center gap-x-[5px] flex-1"
              onClick={() => {
                setIsShowExpand(!isShowExpand)
              }}
            >
              <div
                className={`flex items-center justify-center mx-1 ${
                  isShowExpand && '-rotate-180'
                } transition-all`}
              >
                <ArrowDown />
              </div>
              <span className=" text-black-1 font-bold">Projects</span>
            </button>
            <ButtonIcon
              className="text-gray-3 hover:bg-white-2"
              onClick={() => {
                setShowModalCreateProject(true)
              }}
            >
              <Add className="w-6 h-6" />
            </ButtonIcon>
          </div>
          <ul
            className={`flex flex-col gap-y-1 overflow-y-hidden transition-all duration-300   ${
              isShowExpand ? 'opacity-1' : 'opacity-0'
            }`}
            ref={expandRef}
            style={{ height: heightExpand }}
          >
            {projects &&
              //@ts-ignore
              projects.map((project: IProject) => {
                return (
                  <li key={project.id}>
                    <Project project={project} />
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="w-full">
          <button
            className="flex items-center p-[5px] pr-4 gap-x-[5px] rounded hover:bg-white-3 transition-all w-full "
            onClick={() => {
              signOut()
              console.log('hi')
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  stroke="currentColor"
                  d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"
                ></path>
                <path
                  fill="currentColor"
                  d="M12.8 11l-2.15-2.15a.5.5 0 11.7-.7L14 10.79a1 1 0 010 1.42l-2.65 2.64a.5.5 0 01-.7-.7L12.79 12H4.5a.5.5 0 010-1h8.3z"
                ></path>
              </g>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
      {showModalCreateProject && (
        <ModalCreateProject
          onClose={() => {
            setShowModalCreateProject(false)
          }}
          type="ADD"
        />
      )}
    </aside>
  )
}

interface ProjectProps {
  project: IProject
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const buttonMoreRef = useRef<HTMLButtonElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [isShowMore, setIsShowMore] = useState<boolean>(false)
  const { styles, attributes, update } = usePopper(
    buttonMoreRef.current,
    tooltipRef.current,
    {
      placement: 'bottom',
    }
  )
  const contentToolTipRef = useRef<HTMLDivElement | null>(null)
  const [isShowUpdateProject, setIsShowUpdateProject] = useState<boolean>(false)

  const router = useRouter()

  return (
    <>
      <button className="flex items-center justify-between w-full p-[5px] pr-4 rounded hover:bg-white-3 transition-all  ">
        <Link href={`/projects/${project.projectId}`}>
          <a
            className={`flex items-center  gap-x-[5px] flex-1 ${
              `/${project.projectId}` === router.pathname ? 'bg-white-3' : ''
            }`}
          >
            <div className="flex items-center gap-x-[5px] ">
              <div className="w-6 h-6 flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: project.color.code }}
                ></div>
              </div>
              <span>{project.content}</span>
            </div>
          </a>
        </Link>
        <ButtonIcon
          className="hover:text-black text-[#777] transition-all"
          onClick={async (e) => {
            e.stopPropagation()
            setIsShowMore(true)
            update && (await update())
          }}
          ref={buttonMoreRef}
        >
          <Dots className="text-inherit" />
        </ButtonIcon>
      </button>
      <ClickAwayListener
        onClickAway={(e) => {
          e.stopPropagation()
          setIsShowMore(false)
        }}
      >
        <div
          ref={tooltipRef}
          style={{
            ...styles.popper,
          }}
          {...attributes}
          className={`${
            isShowMore ? 'opacity-100 visible' : 'opacity-0 invisible'
          } transition-all`}
        >
          <div
            className="flex items-center gap-2 bg-white w-max p-2 rounded shadow"
            ref={contentToolTipRef}
          >
            <Button
              className="text-xs min-h-[24px] min-w-[60px]"
              onClick={() => {
                setIsShowUpdateProject(true)
                setIsShowMore(false)
              }}
            >
              Sửa
            </Button>
            <Button
              className="text-xs min-h-[24px] min-w-[60px] bg-black-2 text-white"
              onClick={() => {
                removeDocument(project.id as string, 'projects')
              }}
            >
              Xóa
            </Button>
          </div>
        </div>
      </ClickAwayListener>
      {isShowUpdateProject && (
        <ModalCreateProject
          type="UPDATE"
          color={project.color}
          content={project.content}
          onClose={() => {
            setIsShowUpdateProject(false)
          }}
          currentProjectId={project.id as string}
        />
      )}
    </>
  )
}

export default React.memo(Sidebar)
