import React from "react"
import {format} from "timeago.js"


const Messages = ({ message, own }) => {
  return (
    
    <div className={own ? "flex justify-end mb-2" : "flex mb-2"}>
        <div>
        <div
        className={
          own
            ? "rounded py-2 px-3 bg-blue-200"
            : "rounded py-2 px-3 bg-gray-200"
        }
      >
        <p className="text-sm">{message.text}</p>
      </div>  
      <span className="text-xs">{format(message.createdAt)}</span>  
        </div>
      
    </div>
  )
}

export default Messages
