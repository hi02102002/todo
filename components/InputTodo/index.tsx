import { Button, ButtonIcon } from 'components/Button'
import { LIST_TYPE_TODO } from 'constant'
import { useSession } from 'next-auth/react'
import Today from 'public/today.svg'
import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import ContentEditable from 'react-contenteditable'
import { usePopper } from 'react-popper'
import { addDocument } from 'services'
import { updateTask } from 'services/updateTask'
import { IProject, ITodo } from 'shared'
import { useCollection } from 'swr-firestore-v9'
import { v4 } from 'uuid'

interface Props {
  onFocus?: (e: React.FocusEvent<HTMLElement, Element>) => any
  onCancel?: () => void
  typeInput: 'UPDATE' | 'ADD'
  dataTitle?: string
  dataDesc?: string
  docId?: string
}

const InputTodo: React.FC<Props> = ({
  onFocus,
  onCancel,
  typeInput,
  dataDesc,
  dataTitle,
  docId,
}) => {
  const [title, setTitle] = useState<string>(dataTitle || '')
  const [desc, setDesc] = useState<string>(dataDesc || '')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { data: session } = useSession()
  const { data: projects, unsubscribe } = useCollection(`projects`, {
    listen: true,
    //@ts-ignore
    where: ['userId', '==', session?.user?.id as string],
  })
  const buttonTypeRef = useRef<HTMLButtonElement | null>(null)
  const tooltipTypeRef = useRef<HTMLDivElement | null>(null)
  const buttonProjectRef = useRef<HTMLButtonElement | null>(null)
  const tooltipProjectRef = useRef<HTMLDivElement | null>(null)
  const { attributes, styles, update } = usePopper(
    buttonTypeRef.current,
    tooltipTypeRef.current,
    {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  )
  const {
    attributes: attributesProject,
    styles: stylesProject,
    update: updateProject,
  } = usePopper(buttonProjectRef.current, tooltipProjectRef.current, {
    placement: 'left',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  })
  const [isShowProject, setIsShowProject] = useState<boolean>(false)
  const [isShowType, setIsShowType] = useState<boolean>(false)
  const [type, setType] = useState<{
    icon: any
    name: string
    color: string
    type: 'TODAY' | 'NEXT_7_DAY'
  }>(LIST_TYPE_TODO[0])
  const [project, setProject] = useState<{
    id: string
    content: string
    color?: string
  }>({
    id: 'inbox',
    content: 'Inbox',
  })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '36px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [desc])

  const handleTodo = async () => {
    try {
      setLoading(true)
      const data: ITodo = {
        description: desc.trim(),
        isCompleted: false,
        title: title.trim(),
        todoId: v4(),
        //@ts-ignore
        userId: session?.user.id as string,
        projectId: project.id,
        type: type.type,
      }
      if (typeInput === 'ADD') {
        const data: ITodo = {
          description: desc.trim(),
          isCompleted: false,
          title: title.trim(),
          todoId: v4(),
          //@ts-ignore
          userId: session?.user.id as string,
          projectId: project.id,
          type: type.type,
        }
        await addDocument('todos', data)
      }
      if (typeInput === 'UPDATE' && docId) {
        const data = {
          description: desc.trim(),
          title: title.trim(),
          projectId: project.id,
          type: type.type,
        }
        await updateTask(docId, data)
      }
      setLoading(false)
      onCancel && onCancel()
      setDesc('')
      setTitle('')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [unsubscribe])

  return (
    <div>
      <div className="p-4">
        <div>
          <ContentEditable
            html={title} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => {
              setTitle(e.target.value)
            }} // handle innerHTML change
            tagName="span" // Use a custom HTML tag (uses a div by default)
            placeholder="Task name"
            className="block focus:border-0 focus:outline-none text-sm font-medium text-inherit "
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault()
              }
            }}
            onFocus={onFocus}
          />
          <textarea
            ref={textareaRef}
            placeholder="Description"
            className="w-full resize-none h-9 max-h-52 overflow-y-auto mt-4 focus:border-0 focus:outline-none text-inherit text-[13px]"
            onChange={(e) => {
              setDesc(e.target.value)
            }}
            onFocus={onFocus}
            value={desc}
          ></textarea>
        </div>
        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Button
                className="gap-2 font-normal hover:border-gray-4 hover:bg-white-2 px-2"
                ref={buttonProjectRef}
                onClick={async (e) => {
                  e.stopPropagation()
                  setIsShowProject(true)
                  updateProject && (await updateProject())
                }}
              >
                {project.color ? (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: project.color,
                    }}
                  ></div>
                ) : (
                  <Today className="text-[#246fe0]" />
                )}
                <span>{project.content}</span>
              </Button>
              <ClickAwayListener
                onClickAway={(e) => {
                  e.stopPropagation()
                  setIsShowProject(false)
                }}
              >
                <div
                  ref={tooltipProjectRef}
                  style={{
                    ...stylesProject.popper,
                    display: isShowProject ? 'block' : 'none',
                  }}
                  {...attributesProject}
                  className="bg-white py-2 rounded-[10px] border border-solid z-10"
                >
                  {projects && (
                    <ul>
                      {/* @ts-ignore */}
                      {[{ id: 'inbox', content: 'Inbox' }, ...projects].map(
                        //@ts-ignore
                        (item: IProject) => {
                          return (
                            <li
                              key={item.id}
                              className="flex items-center gap-3 font-medium text-black-3 text-sm mb-1 last:mb-0 hover:bg-white-3 px-3 py-1 cursor-pointer"
                              onClick={() => {
                                setProject({
                                  content: item.content,
                                  id: item.projectId as string,
                                  color: item?.color?.code,
                                })
                                setIsShowProject(false)
                              }}
                            >
                              {item?.color ? (
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor: item?.color?.code,
                                    }}
                                  ></div>
                                </div>
                              ) : (
                                <Today className="w-4 h-4 text-[#246fe0]" />
                              )}
                              <span>{item.content}</span>
                            </li>
                          )
                        }
                      )}
                    </ul>
                  )}
                </div>
              </ClickAwayListener>
            </div>
            <Button
              className="gap-2 font-normal  hover:border-gray-4 hover:bg-white-2 px-2"
              ref={buttonTypeRef}
              onClick={async (e) => {
                e.stopPropagation()
                setIsShowType(!isShowType)
                update && (await update())
              }}
            >
              <type.icon className="w-4 h-4" color={type.color} />
              <span>{type.name}</span>
            </Button>
            <ClickAwayListener
              onClickAway={(e) => {
                e.stopPropagation()
                setIsShowType(false)
              }}
            >
              <div
                ref={tooltipTypeRef}
                style={{
                  ...styles.popper,
                  display: isShowType ? 'block' : 'none',
                }}
                {...attributes}
                className="bg-white py-2 rounded-[10px] border border-solid z-10"
              >
                <ul>
                  {LIST_TYPE_TODO.map((item) => {
                    return (
                      <li
                        key={item.type}
                        className="flex items-center gap-3 font-medium text-black-3 text-sm mb-1 last:mb-0 hover:bg-white-3 px-3 py-1 cursor-pointer"
                        onClick={() => {
                          setType(item)
                          setIsShowType(false)
                        }}
                      >
                        <item.icon width="24" height="24" color={item.color} />
                        <span>{item.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </ClickAwayListener>
          </div>
          <div>
            <ButtonIcon className="hover:bg-black-1/10">
              <svg
                data-svgs-path="sm1/label_outline.svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                color="#202020"
              >
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M3.914 11.086l6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.172a2 2 0 0 1 0-2.828zm.707.707a1 1 0 0 0 0 1.414l6.172 6.172a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5zM14.75 10.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
                ></path>
              </svg>
            </ButtonIcon>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-solid border-gray-1">
        <div className="flex items-center gap-4">
          <Button
            primary
            disabled={title.trim().length === 0}
            onClick={handleTodo}
            loading={loading}
            className="px-2"
          >
            {typeInput === 'ADD' ? ' Add task' : 'Update task'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default InputTodo
