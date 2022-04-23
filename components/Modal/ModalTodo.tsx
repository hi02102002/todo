import InputTodo from 'components/InputTodo'
import React from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { ModalWrap } from '.'

interface Props {
  onClose?: () => void
}

const ModalTodo: React.FC<Props> = ({ onClose }) => {
  return (
    <ModalWrap>
      <ClickAwayListener
        onClickAway={(e) => {
          onClose && onClose()
        }}
      >
        <div className="bg-white max-w-[550px] w-full  rounded-[10px]">
          <InputTodo onCancel={onClose} typeInput="ADD" />
        </div>
      </ClickAwayListener>
    </ModalWrap>
  )
}

export default ModalTodo
