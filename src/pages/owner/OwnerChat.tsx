import React, { useEffect, useMemo, useRef, useState } from "react"
import { OWNER_API, USER_API } from "../../constants"
import { useFetchData } from "../../utils/fetcher"
import { ChatInterface } from "./../../types/chatInterface"
import Conversation from "../../components/chat/Conversation"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import Messages from "../../components/chat/Messages"
import axios from "axios"
import { useSocket } from "../../redux/contexts/SocketContext"
import { noProfile } from "../../assets/images"
import { useAppDispatch } from "../../redux/store/store"
import { removeChat, setChat } from "../../redux/slices/chatSlice"

interface Message {
  _id: string
  senderId: string
  text: string
  createdAt: string
}

const ChatComponent = () => {
  const [conversations, setConversations] = useState<ChatInterface[]>([])
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState<any>(null)
  const socket = useSocket()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const user = useSelector((state: RootState) => state.userSlice)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [typingId, setTypingId] = useState("")
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [senderInfo, setSenderInfo] = useState<any>(null)
  const dispatch = useAppDispatch()
  const { data: conversationData} = useFetchData<
    ChatInterface[]
  >(`${OWNER_API}/conversations`)

  const { data: messageData} = useFetchData<{
    message: Message[]
  }>(currentChat ? `${OWNER_API}/messages/${currentChat._id}` : "")

  useEffect(()=>{
    dispatch(removeChat())
  },[])

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
      socket?.on("senderTyping", (isTyping, userId) => {
        if (userId) {
          setTypingId(userId)
        }
        isTyping ? setIsTyping(true) : setIsTyping(false)
      })
    })
  }, [])

  useEffect(() => {
    if (arrivalMessage) {
      const conversationIndex = conversations.findIndex(conversation =>
        conversation.members.includes(arrivalMessage.senderId)
      )

      if (conversationIndex !== -1) {
        const updatedConversations = [...conversations]
        const [conversation] = updatedConversations.splice(conversationIndex, 1)
        updatedConversations.unshift(conversation)
        setConversations(updatedConversations)

        if (currentChat?._id === conversation._id) {
          setMessages(prev => [...prev, arrivalMessage])
        }
      } else {
        setConversations((prev:any )=> [
          {
            members: [user.id, arrivalMessage.senderId],
            _id: "new_conversation",
          },
          ...prev,
        ])
      }

      //Reset the arrivalMessage state after processing it
      setArrivalMessage(null)
    }
  }, [arrivalMessage, currentChat, conversations, user.id])

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

  useEffect(() => {
    if (conversationData) {
      console.log(
        conversations,
        "................................................"
      )

      setConversations(conversationData)
    }
  }, [conversationData])

  useEffect(() => {
    if (messageData) {
      setMessages(messageData?.message)
    }
  }, [messageData])

  console.log(messages)

  const receiverId = useMemo(() => {
    return currentChat?.members.find(member => member !== user.id)
  }, [currentChat, user.id])

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
      senderId: user.id,
      receiverId,
      text: newMessage,
      chatId: currentChat?._id,
    })

    const message = {
      senderId: user.id,
      conversationId: currentChat?._id,
      text: newMessage,
    }

    try {
      const res = await axios.post(`${OWNER_API}/messages`, message)
      setMessages(prev => [...prev, res.data])
      setNewMessage("")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        console.log(currentChat, "current chat")
        const senderId = currentChat?.members.find(member => member !== user.id)
        if (senderId) {
          const response = await axios.get(USER_API + "/user/" + senderId)
          setSenderInfo(response.data.user)
          console.log(response, "response")
        }
      } catch (error) {
        console.error("Error fetching sender info:", error)
      }
    }

    if (currentChat) {
      fetchSenderInfo()
    }
  }, [currentChat, user.id])

  console.log(senderInfo, "sender iNfooo")

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleConversationClick = (conversation: any) => {
    dispatch(setChat(conversation))
    setCurrentChat(conversation)
    setIsChatOpen(true)
  }

  console.log(currentChat, "current chat 😃")

  return (

    <div className=" pt-2">
      <div className="flex bg-white dark:bg-gray-900 p-5">
        <div
          className={` h-screen bg-varGrey border shadow-md p-2 ${
            !isChatOpen ? "md:block w-full md:w-80" : "hidden md:block w-80"
          }`}
        >
          <div className="h-full  overflow-y-auto">
            <div className="text-xl font-extrabold mb-4 flex gap-3 text-gray-600 border rounded-md shadow-md dark:text-gray-200 p-3">
              <img
                className="w-10 h-10  rounded-full"
                src={user && user.image ? user.image : noProfile}
                alt="Avatar"
              />
              {user.name}
            </div>
            {/* <div className="search-chat flex p-3">
              <input
                className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
                type="text"
                placeholder="Search Messages"
              />
              <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div> */}

            <Conversation
              chats={conversations}
              // showChatsidebar={showChatsidebar}
              // setShowChatSidebar={setShowChatSidebar}
              currentChat={currentChat}
              handleCurrentChatClick={handleConversationClick}
            />
          </div>
        </div>
        <div className={`flex-grow h-svh p-2 rounded-md ${isChatOpen?"md:block":"md:block hidden"}`}>
          {currentChat?(<>          <div className="flex-grow h-full flex flex-col">
            <div className="w-full h-15 p-1 bg-varBlue dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
              <div className="flex p-2 align-middle items-center">
                <div onClick={()=>setIsChatOpen(false)} className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <div className="border rounded-full border-white p-1/2">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={senderInfo?.profilePic || noProfile}
                    alt="avatar"
                  />
                </div>
                <div className="flex-grow p-2">
                  <div className="text-md text-gray-50 font-semibold">
                    {senderInfo && senderInfo?.name}
                  </div>
                  <div className="flex items-center">
                    <div className=" text-varWhite ml-1">
                      {isTyping && currentChat?.members.includes(typingId)
                        ? "Typing..."
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full flex-grow no-scrollbar my-2 p-2 overflow-y-auto">
              {messages.map((m: any) => (
                <div key={m._id} ref={scrollRef}>
                  <Messages message={m} own={m.senderId === user.id} />
                </div>
              ))}
            </div>
            <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
              <div className="flex items-center">
                <div className="p-2 text-gray-600 dark:text-gray-200 ">
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="search-chat flex flex-grow p-2">
                  <input
                    className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
                    type="text"
                    placeholder="Type your message ..."
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                    onBlur={() => handleTypingStatus("blur")}
                    onFocus={() => handleTypingStatus("focus")}
                  />
                  {newMessage ? (
                    <div
                      onClick={handleSubmit}
                      className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md"
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div></>):( <><div className="flex justify-center bg-gray-200 h-full">
            <p className="text-2xl pt-56  ">Please Select A Chat to Start Converstion</p></div></>)}

        </div>
      </div>
    </div>
  )
}

export default ChatComponent
