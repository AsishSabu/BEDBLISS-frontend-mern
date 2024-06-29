import React, { useState, useEffect } from "react"
import useSWR from "swr"
// import { fetcher } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import { noProfile } from "../../assets/images"
import { useSocket } from "../../redux/contexts/SocketContext"
import { MessageInterface } from "../../types/chatInterface"
import { useFetchData } from "../../utils/fetcher"

const Conversation = ({ conversation, currentChat, currentUser }) => {
  
  const friendId = conversation.members.find((m:string)=> m !== currentUser.id)
  const { data, isError: error } = useFetchData<any>(
    friendId ? `${USER_API}/user/${friendId}` : ""
  )
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [newMessageCount, setNewMessageCount] = useState<number>(0)
  const socket = useSocket()
  const [currentId, setCurrentId] = useState("")

  useEffect(() => {
    socket?.on(
      "notification",
      async ({
        count,
        senderId,
        chatId,
        text,
      }: {
        count: number
        senderId: string
        chatId: string
        text: string
      }) => {
        if (currentChat) {
          console.log(currentChat, "/////////////////////")
        }
        console.log(currentId, chatId, text, "...........🏴󠁧󠁢󠁷󠁬󠁳󠁿")
        // if(current._id!==chatId){
        //   console.log("not the chat..................................................................")
        // }

        if (conversation?.members.includes(senderId)) {
          setNewMessageCount(prev => prev + count)
        }

        // else {
        //   setMessages((prev) => [
        //     ...prev,
        //     {
        //       senderId: senderId,
        //       text: text,
        //       createdAt: new Date(),
        //     },
        //   ]);
        // }
        // await getConversations(chatId, senderId);
      }
    )
    return () => {
      socket?.off("notification")
    }
  }, [])
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="bg-white px-3 flex items-center hover:bg-gray-100 cursor-pointer">
      <div>
        <img
          className="h-12 w-12 rounded-full"
          src={data.user.profilePicture ? data.user.profilePicture : noProfile}
          alt={data.user.name || "User"}
        />
      </div>
      <div className="ml-4 flex-1 border-b border-gray-300 py-4">
        <div className="flex items-bottom justify-between">
          <p className="text-gray-800">{data.user.name || "User"}</p>
          <p className="text-xs text-gray-800">12:45 pm</p>
        </div>
        <p className="text-gray-700 mt-1 text-sm">I'll be back</p>
        <span>{newMessageCount}</span>
      </div>
    </div>
  )
}

export default Conversation
