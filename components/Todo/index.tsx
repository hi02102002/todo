import { ButtonIcon } from 'components/Button'
import Checkbox from 'components/Checkbox'
import InputTodo from 'components/InputTodo'
import React, { useState } from 'react'
import { removeDocument } from 'services'
import { doneTask } from 'services/doneTask'
import { ITodo } from 'shared'

interface Props {
  todo: ITodo
}

const Todo: React.FC<Props> = ({ todo }) => {
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false)
  return !isShowEdit ? (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <div
          className="mr-[6px]"
          onClick={async () => {
            setTimeout(async () => {
              if (todo.id) {
                await doneTask(todo.id)
              }
            }, 500)
          }}
        >
          <Checkbox />
        </div>
        <div>
          <h4 className="font-medium">{todo.title}</h4>
          <p className="text-sm">{todo.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <ButtonIcon
          className="text-inherit hover:bg-black/10 mr-4"
          onClick={() => {
            setIsShowEdit(true)
          }}
        >
          <svg width="24" height="24">
            <g fill="none" fillRule="evenodd">
              <path
                fill="currentColor"
                d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"
              ></path>
              <path
                stroke="currentColor"
                d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"
              ></path>
            </g>
          </svg>
        </ButtonIcon>
        <ButtonIcon
          className="text-inherit hover:bg-black/10"
          onClick={() => {
            if (todo.id) {
              removeDocument(todo.id as string, 'todos')
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <rect
                width="14"
                height="1"
                x="5"
                y="6"
                fill="currentColor"
                rx=".5"
              ></rect>
              <path
                fill="currentColor"
                d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"
              ></path>
              <path
                stroke="currentColor"
                d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"
              ></path>
            </g>
          </svg>
        </ButtonIcon>
      </div>
    </div>
  ) : (
    <div className="border border-solid border-gray-1 rounded ">
      <InputTodo
        typeInput="UPDATE"
        docId={todo.id}
        dataTitle={todo.title}
        dataDesc={todo.description as string}
        onCancel={() => {
          setIsShowEdit(false)
        }}
      />
    </div>
  )
}

export default Todo
