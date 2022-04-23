import { Button } from 'components/Button'
import { COLORS } from 'constant'
import { useClickOutSide } from 'hooks'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { addDocument } from 'services'
import { updateProject } from 'services/updateProject'
import { IProject } from 'shared'
import { v4 } from 'uuid'
import { ModalWrap } from '.'

interface Props {
  onClose?: () => void
  content?: string
  color?: {
    code: string
    name: string
  }
  type: 'UPDATE' | 'ADD'
  currentProjectId?: string
}

const ModalProject: React.FC<Props> = ({
  onClose,
  content,
  color,
  type,
  currentProjectId,
}) => {
  const [selectedColor, setSelectedColor] = useState<{
    code: string
    name: string
  }>(color || COLORS[0])
  const [showSelectColor, setShowSelectColor] = useState<boolean>(false)
  const buttonOpenSelectColorRef = useRef<HTMLButtonElement | null>(null)
  const listColorsRef = useRef<HTMLDivElement | null>(null)
  const [nameProject, setNameProject] = useState<string>(content || '')
  const { data: session } = useSession()
  const { styles, attributes } = usePopper(
    //@ts-ignore
    buttonOpenSelectColorRef.current,
    listColorsRef.current,
    {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  )
  const modalRef = useRef<HTMLDivElement | null>(null)
  useClickOutSide(modalRef, (e) => {
    onClose && onClose()
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleProject = async () => {
    setLoading(true)

    if (type === 'ADD') {
      const project: IProject = {
        color: {
          code: selectedColor.code,
          name: selectedColor.name,
        },
        content: nameProject,
        projectId: v4(),
        //@ts-ignore
        userId: session?.user?.id,
      }
      await addDocument('projects', project)
      setNameProject('')
    }
    if (type === 'UPDATE') {
      const project = {
        color: {
          code: selectedColor.code,
          name: selectedColor.name,
        },
        content: nameProject,
      }
      await updateProject(currentProjectId as string, project)
    }
    setLoading(false)
    onClose && onClose()
  }

  return (
    <ModalWrap>
      <div
        className="w-full max-w-[400px] bg-white rounded-xl overflow-hidden"
        ref={modalRef}
      >
        <div className="px-6 h-14 flex items-center justify-center bg-white-1  ">
          <h3 className="font-bold">Add project</h3>
        </div>
        <div className="py-5 px-6">
          <div className="w-full flex flex-col mb-5 ">
            <label htmlFor="" className="text-sm font-bold mb-2 ">
              Name
            </label>
            <input
              type="text"
              className="border border-solid border-gray-1 outline-none focus:border-gray-3 rounded p-[5px]"
              onChange={(e) => {
                setNameProject(e.target.value)
              }}
              value={nameProject}
            />
          </div>
          <div>
            <button
              ref={buttonOpenSelectColorRef}
              className="border border-solid border-gray-1 outline-none focus:border-gray-3 rounded p-[5px] flex items-center w-full"
              onClick={() => {
                setShowSelectColor(true)
              }}
            >
              <div
                className="w-3 h-3 rounded-full mx-[6px] mr-[11px]"
                style={{ backgroundColor: selectedColor.code }}
              ></div>
              <span>{selectedColor.name}</span>
            </button>
            <div
              ref={listColorsRef}
              className={`${
                showSelectColor ? 'opacity-100 visible' : 'opacity-0 invisible'
              } transition-opacity z-10 `}
              style={{
                ...styles.popper,
                width:
                  buttonOpenSelectColorRef.current?.offsetWidth || undefined,
              }}
              {...attributes.popper}
            >
              <ul className="py-2 rounded border border-solid  bg-white  border-gray-1 ">
                {COLORS.map((color) => (
                  <li
                    key={color.name}
                    className={` p-[6px] flex items-center w-full cursor-pointer hover:bg-white-3 transition-all ${
                      color.name === selectedColor.name ? 'bg-white-3' : ''
                    }`}
                    onClick={() => {
                      setSelectedColor(color)
                      setShowSelectColor(false)
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-[6px] mr-[11px]"
                      style={{ backgroundColor: color.code }}
                    ></div>
                    <span>{color.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="px-6 h-14 flex items-center justify-end bg-white-1  ">
          <div className="flex items-center">
            <Button onClick={onClose} className="mr-4">
              Cancel
            </Button>
            <Button
              disabled={nameProject.trim().length === 0 || loading}
              className="bg-black-2 text-white"
              onClick={handleProject}
              loading={loading}
            >
              {type === 'ADD' ? 'Add' : 'Update'}
            </Button>
          </div>
        </div>
      </div>
    </ModalWrap>
  )
}

export default ModalProject
