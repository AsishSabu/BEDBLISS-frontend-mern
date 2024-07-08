// import React, { useState, useEffect } from "react"
// import useSWR from "swr"
// // import { fetcher } from "../../utils/fetcher"
// import { USER_API } from "../../constants"
// import { noProfile } from "../../assets/images"
// import { useSocket } from "../../redux/contexts/SocketContext"
// import { ChatInterface, MessageInterface } from "../../types/chatInterface"
// import { useFetchData } from "../../utils/fetcher"
// import { useAppDispatch, useAppSelector } from "../../redux/store/store"
// import { removeChat } from "../../redux/slices/chatSlice"

// const Conversation = ({ conversation, currentUser }) => {
//   const friendId = conversation.members.find(
//     (m: string) => m !== currentUser.id
//   )
//   const { data, isError: error } = useFetchData<any>(
//     friendId ? `${USER_API}/user/${friendId}` : ""
//   )
//   const [messages, setMessages] = useState<MessageInterface[]>([])
//   const [newMessageCount, setNewMessageCount] = useState<number>(0)
//   const socket = useSocket()
//   const dispatch = useAppDispatch()
//   const [currentId, setCurrentId] = useState("")
//   const [current, setCurrent] = useState<ChatInterface | null>(null)
//   useEffect(() => {
//     dispatch(removeChat())
//   }, [])
//   let ownerId: string | undefined

//   useEffect(() => {
//     const handleNotification = ({
//       count,
//       senderId,
//       chatId,
//       text,
//     }: {
//       count: number
//       senderId: string
//       chatId: string
//       text: string
//     }) => {
//       const curr = useAppSelector(state => state.chatSlice)

//       if (curr) {
//         console.log(
//           curr?.currentChat,
//           "//////////////////////////////////////////////////"
//         )

//         setCurrent(curr?.currentChat)
//       }
// if(current){
//   console.log("Received notification:", chatId, current?._id, count)

// }

//       if (
//         ownerId &&
//         senderId !== ownerId &&
//         conversation.members.includes(senderId)
//       ) {
//         console.log("Incrementing newMessageCount...")
//         setNewMessageCount(prev => prev + count)
//       } else {
//         console.log("Resetting newMessageCount to 0...")
//         setNewMessageCount(0)
//       }
//     }

//     socket?.on("notification", handleNotification)

//     return () => {
//       socket?.off("notification", handleNotification)
//     }
//   }, [])

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return (
//     <div className="bg-white px-3 flex items-center hover:bg-gray-100 cursor-pointer">
//       <div>
//         <img
//           className="h-12 w-12 rounded-full"
//           src={data.user.profilePicture ? data.user.profilePicture : noProfile}
//           alt={data.user.name || "User"}
//         />
//       </div>
//       <div className="ml-4 flex-1 border-b border-gray-300 py-4">
//         <div className="flex items-bottom justify-between">
//           <p className="text-gray-800">{data.user.name || "User"}</p>
//           <p className="text-xs text-gray-800">12:45 pm</p>
//         </div>
//         <p className="text-gray-700 mt-1 text-sm">I'll be back</p>
//         <span>{newMessageCount}</span>
//       </div>
//     </div>
//   )
// }

// export default Conversation
import { useAppSelector } from "../../redux/store/store"
import { ChatInterface } from "../../types/chatInterface"
import ConversationItem from "./ConversationItem"

interface ChatSidebarProps {
  chats: ChatInterface[]
  // showChatsidebar: boolean;
  // setShowChatSidebar: (isOpen: boolean) => void;
  handleCurrentChatClick: (chat: ChatInterface) => void
  currentChat: ChatInterface | null
}

const Conversation: React.FC<ChatSidebarProps> = ({
  chats,
  // showChatsidebar,
  // setShowChatSidebar,
  handleCurrentChatClick,
  currentChat,
}) => {
  const user = useAppSelector(state => state.userSlice)
  return (
    <div>
      {chats.map(chat => (
        <div onClick={() => handleCurrentChatClick(chat)} key={chat._id}>
          <ConversationItem
            {...chat}
            userId={user?.id ?? ""}
            currentChat={currentChat}
            // key={chat._id}
            // chat={chat}
            // active={currentChat?._id === chat._id}
            // onClick={() => handleCurrentChatClick(chat)}
          />
        </div>
      ))}
    </div>
  )
}

export default Conversation
