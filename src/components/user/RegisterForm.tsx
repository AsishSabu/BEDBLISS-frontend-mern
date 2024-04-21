import React from 'react'

const RegisterForm = () => {
  return (
    <body className="flex font-poppins items-center justify-center">
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-200">
      <div className="grid gap-8">
        <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
          <h1 className="pt-8 pb-6 font-bold text-blue-800 text-4xl text-center cursor-default">
            Sign Up
          </h1>
          <form action="#" method="post" className="space-y-4">
          <div>
              <label className="mb-2  text-gray-400 text-lg">Name</label>
              <input
                id="name"
                className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="mb-2  text-gray-400 text-lg">Email</label>
              <input
                id="email"
                className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
           
            <div>
              <label className="mb-2 text-gray-400 text-lg">Phone Number</label>
              <input
                id="number"
                className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="number"
                placeholder="Number"
                required
              />
            </div>
            <div>
              <label className="mb-2 text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          
            <button
              className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN UP
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-gray-300">
              already have an account?
              <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Sign In
                </span>
              </a>
            </h3>
          </div>

        
        </div>
      </div>
    </div>
  </body>
  )
}

export default RegisterForm
