import NoTaskSvg from 'public/noTask.svg'
import React from 'react'

const NoTask = () => {
  return (
    <div>
      <div className="text-center">
        <NoTaskSvg className="w-56 mx-auto" />
        <span className="my-4 text-base font-medium">All clear</span>
        <p className="my-5">
          {"Looks like everything's organized in the right place."}
        </p>
      </div>
    </div>
  )
}

export default NoTask
