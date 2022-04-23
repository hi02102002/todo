import { Spinner } from 'components/Loading'
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  primary?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      type={props.type}
      className={`min-h-[32px] flex items-center justify-center bg-white-4 border-solid border border-gray-1 hover:border-gray-3 transition-all min-w-[80px] rounded disabled:opacity-40 disabled:cursor-not-allowed font-medium ${
        props.className && props.className
      } ${
        props.primary
          ? 'bg-black-2 text-white border-black-2 hover:border-black-2'
          : ''
      }`}
    >
      {props.loading ? <Spinner className="w-5 h-5" /> : props.children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
