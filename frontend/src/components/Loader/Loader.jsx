import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
