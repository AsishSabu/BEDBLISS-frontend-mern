import React, { useEffect, useState } from "react"
import { ChatInterface } from "../../types/chatInterface"
import { useFetchData } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import { noProfile } from "../../assets/images"
import { useSocket } from "../../redux/contexts/SocketContext"
interface ConversationProps extends ChatInterface {
  userId: string
  currentChat: ChatInterface | null
}
const ConversationItem: React.FC<ConversationProps> = ({
  members,
  userId,
  _id: conversationId,
  currentChat,
}) => {
  const friendId = members.find((m: string) => m !== userId)
  const { data, isError: error } = useFetchData<any>(
    friendId ? `${USER_API}/user/${friendId}` : ""
  )
  // const _class = active ? 'bg-gray-200' : 'bg-white';
  const [newMessageCount, setNewMessageCount] = useState<number>(0)
  const socket = useSocket()

  useEffect(() => {
    const handleNotification = ({
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
      if (members.includes(senderId)) {
        setNewMessageCount(prev => prev + count)
      }
    }
    socket?.on("notification", handleNotification)
    return () => {
      socket?.off("notification", handleNotification)
    }
  }, [])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <div className="conversation-item p-1 dark:bg-gray-700 bg-varCream hover:bg-gray-200 m-1 rounded-md ">
        <div className={"flex items-center p-2  cursor-pointer  "}>
          <div className="w-7 h-7 m-1">
            <img
              className="rounded-full"
              src={data.user.profilePic ? data.user.profilePic : noProfile}
              alt={data.user.name || "User"}
            />
          </div>
          <div className="flex-grow p-2">
            <div className="flex justify-between text-md ">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {data.user.name || "User"}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-300">
                dfsdf
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
              dsad
              {/* {message} */}
            </div>
            <span>{newMessageCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationItem
