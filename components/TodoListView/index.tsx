import InputTodo from 'components/InputTodo'
import NoTask from 'components/NoTask'
import Todo from 'components/Todo'
import React, { useState } from 'react'
import { ITodo } from 'shared'

interface Props {
  todoList: ITodo[]
  title: string
}

const TodoListView: React.FC<Props> = ({ todoList, title }) => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false)
  return (
    <>
      <h2 className="text-[20px] font-bold mb-4">{title}</h2>
      <div>
        {todoList?.length > 0 && (
          <ul className="flex flex-col mb-4">
            {todoList?.map((_todo) => (
              <li key={_todo.todoId} className="mb-4 last:mb-0">
                <Todo todo={_todo} />
              </li>
            ))}
          </ul>
        )}

        {isShowAdd ? (
          <div className="border border-solid border-gray-1 rounded ">
            <InputTodo
              typeInput="ADD"
              onCancel={() => {
                setIsShowAdd(false)
              }}
            />
          </div>
        ) : (
          <div
            className="flex items-center mt-4 cursor-pointer "
            onClick={() => {
              setIsShowAdd(true)
            }}
          >
            <div className="mr-[6px] w-4 h-4 flex items-center justify-center">
              <svg width="13" height="13">
                <path
                  d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span>Add task</span>
          </div>
        )}
      </div>
      {todoList?.length === 0 && <NoTask />}
    </>
  )
}

export default React.memo(TodoListView)
