import React, { HTMLProps, useState } from 'react'
import { BiCheck } from 'react-icons/bi'

interface Props extends HTMLProps<HTMLInputElement & HTMLDivElement> {}

const Checkbox: React.FC<Props> = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState<boolean>(props.checked as boolean)

  const toggle = (e: any) => {
    e.preventDefault()
    if (props.disabled) {
      return
    }
    setIsChecked(!isChecked)
  }

  return (
    <div className={props.className}>
      <input
        {...props}
        type="checkbox"
        name="custom-checkbox"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked)
        }}
        className="hidden"
        disabled={props.disabled}
      />
      <div
        className="w-4 h-4 border border-solid border-white-5 flex items-center justify-center rounded-full text-gray-500 cursor-pointer"
        onClick={toggle}
      >
        <BiCheck
          className={`w-3 h-3 transition-all duration-300 ${
            isChecked
              ? 'opacity-100 visible scale-100'
              : 'opacity-0 invisible scale-50'
          }`}
        />
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  checked: false,
}

export default Checkbox
