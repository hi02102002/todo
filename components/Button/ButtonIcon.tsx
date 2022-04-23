/* eslint-disable react/display-name */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  width?: string
  height?: string
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, Props>(
  ({ width, height, ...props }, ref) => {
    return (
      <button
        {...props}
        className={`${width || 'w-7'} 
      ${height || 'h-7'} hover:bg-[rgba(255,255,255,0.2)]
      rounded flex items-center justify-center text-white transition-[background-color] duration-[0.3s] ${
        props.className || ''
      } `}
        ref={ref}
      >
        {props.children}
      </button>
    )
  }
)

export default ButtonIcon
