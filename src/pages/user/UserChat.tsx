import React, { useEffect, useRef, useState } from "react"
import showToast from "../../utils/toast"
import { noProfile } from "../../assets/images"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import { useFetchData } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import { ChatInterface } from "../../types/chatInterface"
import { useSocket } from "../../redux/contexts/SocketContext"
import Messages from "../../components/chat/Messages"
import axios from "axios"
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  ownerId: any
}

interface Message {
  _id: string
  senderId: string
  text: string
  createdAt: string
}

const UserChat: React.FC<ModalProps> = ({ isOpen, onClose, ownerId }) => {
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState<any>(null)
  const socket = useSocket()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const { data: owner } = useFetchData<any>(`${USER_API}/user/${ownerId}`)
  const user = useSelector((state: RootState) => state.userSlice)
  const senderId = user.id
  const receiverId = ownerId

  const { data: conversationData } = useFetchData<ChatInterface>(
    `${USER_API}/conversations?senderId=${senderId}&receiverId=${receiverId}`
  )

  const { data: messageData, isError: messageError } = useFetchData<{
    message: Message[]
  }>(currentChat ? `${USER_API}/messages/${conversationData?._id}` : "")

  useEffect(() => {
    if (conversationData) {
      setCurrentChat(conversationData)
    }
  }, [conversationData])

  useEffect(() => {
    if (messageData) {      
      setMessages(messageData?.message)
    }
  }, [messageData])

  console.log(messageData, "messages")

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
      socket?.on("senderTyping", (isTyping) => {
        isTyping ? setIsTyping(true) : setIsTyping(false)
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages(prev => [...prev, arrivalMessage])
    setArrivalMessage(null)
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to socket")
      })

      socket.emit("addUser", user.id)

      socket.on("getUsers", users => {
        console.log(users)
      })

      return () => {
        socket.off("getUsers")
      }
    }
  }, [socket])

  const emitTypingStatus = (isTyping: boolean) => {
    socket?.emit("typing", {
      receiverId,
      isTyping,
      userId: user.id,
    })
  }

  const handleTypingStatus = (action: "focus" | "blur") =>
    action === "focus" ? emitTypingStatus(true) : emitTypingStatus(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    socket?.emit("sendMessage", {
      senderId,
      receiverId,
      text: newMessage,
      chatId: currentChat?._id,
    })

    const message = {
      senderId,
      receiverId,
      text: newMessage,
      chatId:currentChat?._id
    }

    try {
      const res = await axios.post(`${USER_API}/chat`, message)
      console.log(res,"response..........")
      setMessages(prev => [...prev, res.data.message])
      setNewMessage("")
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])
  
  const closeChat = () => {
    onClose()
  }
  console.log(ownerId, "ownerrr   id")
  console.log(user.id, "user   id")
  console.log(owner, "owner")
  console.log(isTyping,".......................")

  if (!isOpen) return null

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end w-full z-50">
      {/* Chat Modal */}
      <div
        className={`chat-modal bg-white shadow-lg rounded-lg p-4 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } transition-transform duration-500 ease-in-out fixed bottom-0 right-0 m-5 sm:w-1/2 md:w-1/3 lg:w-1/4`}
      >
        {/* Close button */}
        <div
          onClick={closeChat}
          className="close-chat bg-green-500 hover:bg-red-600 text-white mb-1 w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {/* Admin profile */}
        <div className="flex justify-between items-center text-white p-2 bg-Marine_blue border shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <img
              src={
                owner?.user?.profilePic ? owner?.user?.profilePic : noProfile
              }
              alt="Admin"
              className="rounded-full w-8 h-8 mr-1"
            />
            <h2 className="font-semibold tracking-wider">
              {owner?.user?.name ? owner?.user?.name : "no Name"}
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <small className="mr-1">{isTyping?"Typing.....":""}</small>
            <div className="rounded-full w-2 h-2 bg-white"></div>
          </div>
        </div>
        {/* Chats */}
        <div className="flex flex-col bg-gray-200 p-2 overflow-y-auto max-h-96 min-h-96">
          {messages.map((m: any) => (
            <div key={m._id} ref={scrollRef}>
              <Messages message={m} own={m.senderId === senderId} />
            </div>
          ))}
        </div>
        {/* Send message */}
        <form className="relative bg-white" onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Ketik pesan anda"
            className="pl-4 pr-16 py-2 border border-green-500 focus:outline-none w-full"
            onChange={e => setNewMessage(e.target.value)}
            value={newMessage}
            onBlur={() => handleTypingStatus("blur")}
            onFocus={() => handleTypingStatus("focus")}
          />
          <button
            type="submit"
            className="absolute right-0 bottom-0 text-green-600 bg-white hover:text-green-500 m-1 px-3 py-1 w-auto transition-colors duration-100 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserChat
