import React from 'react'

const Body = () => {

  return (
    <div className="max-w-md max-h-max mx-auto bg-varGreen shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <img
          className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full"
          src="https://via.placeholder.com/64"
          alt="Profile"
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-xl font-semibold text-gray-800">John Doe</p>
          <p className="text-sm font-medium text-gray-600">Software Engineer</p>
          <div className="mt-2">
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Body
