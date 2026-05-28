import React from 'react'

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        {message && <p className="mt-4 text-base-content/70 font-medium">{message}</p>}
      </div>
    </div>
  )
}

export default Spinner
