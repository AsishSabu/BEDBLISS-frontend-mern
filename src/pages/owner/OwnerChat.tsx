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
import { setChat } from "../../redux/slices/chatSlice"

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
  const [lastMessages, setLastMessages] = useState<{ [key: string]: any }>({})
  const socket = useSocket()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const user = useSelector((state: RootState) => state.userSlice)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [typingId, setTypingId] = useState("")
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [senderInfo, setSenderInfo] = useState(null)
  const dispatch = useAppDispatch()
  const { data: conversationData, isError: conversationError } = useFetchData<
    ChatInterface[]
  >(`${OWNER_API}/conversations`)

  const { data: messageData, isError: messageError } = useFetchData<{
    message: Message[]
  }>(currentChat ? `${OWNER_API}/messages/${currentChat._id}` : "")

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
        setConversations(prev => [
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
    setCurrentChat(conversation)
    dispatch(setChat(conversation))
    setIsChatOpen(true)
  }

  console.log(currentChat, "current chat 😃")

  return (
    // <div>
    //   <div className="container mx-auto">
    //     <div
    //       className="flex  md:flex-row border border-gray-400 rounded shadow-lg"
    //       style={{ height: "calc(100vh - 10rem)" }}
    //     >
    //       {/* Left */}
    //       <div className="w-full md:w-1/3 border flex flex-col">
    //         {/* Header */}
    //         <div className="py-2 px-3 bg-varBlueGray flex flex-row justify-between items-center">
 


    //           <>
    //             <div className=" top-[30%] text-center w-full">
    //               <h1 className="text-4xl text-gray-400 cursor-default mb-4">
    //                 Start a Conversation!
    //               </h1>
    //               <p className="text-lg text-gray-600">
    //                 Click on a conversation to start chatting.
    //               </p>
    //             </div>
    //           </>


    <div className=" pt-2">
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-20  text-gray-500 h-screen flex flex-col items-center justify-between py-5">
          <div className="">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="py-4 hover:text-gray-700">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="py-4 hover:text-gray-700 flex flex-col items-center justify-center text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
            </div>
            <div className="py-4 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
          <div className="">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full  overflow-y-auto">
        

         
            <div className="text-xl font-extrabold flex gap-3 text-gray-600 dark:text-gray-200 p-3">
            <img
             className="w-10 h-10  rounded-full"
             src={noProfile}
             alt="Avatar"
           />
              Chikaa
            </div>
            <div className="search-chat flex p-3">
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
            </div>
            <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">
              Recent
            </div>
            <Conversation
              chats={conversations}
              // showChatsidebar={showChatsidebar}
              // setShowChatSidebar={setShowChatSidebar}
              currentChat={currentChat}
              handleCurrentChatClick={handleConversationClick}
            />
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded -md">
          <div className="flex-grow h-full flex flex-col">
            <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
              <div className="flex p-2 align-middle items-center">
                <div  className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
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
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <div className="text-xs text-gray-50 ml-1">
                      {isTyping && currentChat?.members.includes(typingId)
                        ? "Typing"
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
            <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
