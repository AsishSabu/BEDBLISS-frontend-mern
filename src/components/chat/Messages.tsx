import React from "react"
import { format } from "timeago.js"

const Messages = ({ message, own }) => {
  return (
    <div>
      {own ? (
        <>
          {" "}
          <div className=" flex justify-end">
            <img
              className="w-8 h-8 m-3 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
            <div className="p-3 bg-varGrey dark:bg-gray-800  mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
              <div className="text-xs text-gray-100 hidden dark:text-gray-200">
                Rey Jhon A. Baqurin
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                {message.text}
              </div>
              <div className="text-xs text-gray-400">
                {format(message.createdAt)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" flex items-end ">
          <div className="flex items-end w-auto bg-gray-300 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
            <div className="p-2">
              <div className="text-black">{message.text}</div>
              <div className="text-xs text-gray-400">
                {format(message.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
