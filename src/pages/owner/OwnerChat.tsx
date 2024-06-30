import React, { useEffect, useMemo, useRef, useState } from "react"
import { OWNER_API } from "../../constants"
import {  useFetchData } from "../../utils/fetcher"
import { ChatInterface } from "./../../types/chatInterface"
import Conversation from "../../components/chat/Conversation"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import Messages from "../../components/chat/Messages"
import axios from "axios"
import { useSocket } from "../../redux/contexts/SocketContext"

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
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


  const { data: conversationData, isError: conversationError } = useFetchData<ChatInterface[]>(
    `${OWNER_API}/conversations`
  );

  const { data: messageData, isError: messageError } = useFetchData<{ message: Message[] }>(
    currentChat ? `${OWNER_API}/messages/${currentChat._id}` : ""
  );

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

  useEffect(() => {
    if (conversationData) {
      console.log(conversations,"................................................");
      
      setConversations(conversationData)
    }
  }, [conversationData])

  useEffect(() => {
    if (messageData) {
      setMessages(messageData?.message)
    }
  }, [messageData])

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
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleConversationClick = (conversation:any)=> {
    setCurrentChat(conversation)
    setIsChatOpen(true)
  }

  console.log(currentChat, "current chat 😃")

  return (
    <div>
      <div className="container mx-auto">
        <div
          className="flex pt-20 md:flex-row border border-gray-400 rounded shadow-lg"
          style={{ height: "calc(100vh - 10rem)" }}
        >
          {/* Left */}
          <div className="w-full md:w-1/3 border flex flex-col">
            {/* Header */}
            <div className="py-2 px-3 bg-Pastel_blue flex flex-row justify-between items-center">
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src="http://andressantibanez.com/res/avatar.png"
                  alt="Avatar"
                />
              </div>

              <div className="flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#727A7E"
                      d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      opacity=".55"
                      fill="#263238"
                      d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#263238"
                      fillOpacity=".6"
                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="py-2 px-2 bg-gray-100">
              <input
                type="text"
                className="w-full px-2 py-2 text-sm"
                placeholder="Search or start new chat"
              />
            </div>

            {/* Contacts */}
            <div className="bg-gray-200 flex-1 overflow-auto hide-scrollbar">
              {conversations.map(c => (
                <div key={c._id} onClick={() => handleConversationClick(c)}>
                  <Conversation
                    conversation={c}
                    currentChat={currentChat}
                    currentUser={user}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="w-2/3 border flex flex-col">
            {/* Header */}
            <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
              <div className="flex items-center">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="http://andressantibanez.com/res/avatar.png"
                    alt="Avatar"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">Person's name</p>
                  <p className="text-xs text-gray-800">
                    {isTyping && currentChat?.members.includes(typingId)
                      ? "Typing"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex">
                {/* <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#727A7E"
                      d="M15.873 12l3.524-3.524c.625-.625.625-1.632 0-2.256a1.59 1.59 0 0 0-2.256 0L12 9.873 8.476 6.348a1.59 1.59 0 0 0-2.256 0c-.625.625-.625 1.632 0 2.256L9.873 12l-3.525 3.524a1.59 1.59 0 0 0 0 2.256c.625.625 1.632.625 2.256 0L12 14.127l3.524 3.524c.625.625 1.632.625 2.256 0 .625-.625.625-1.632 0-2.256L14.127 12z"
                    ></path>
                  </svg>
                </div> */}
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#727A7E"
                      d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#727A7E"
                      d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto" id="chat">
              <div className="py-2 px-3">
                <div className="flex justify-center mb-2">
                  <div className="rounded py-2 px-4 bg-gray-200">
                    <p className="text-sm uppercase">February 20, 2021</p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="rounded py-2 px-4 bg-gray-200">
                    <p className="text-xs">
                      Messages to this chat and calls are now secured with
                      end-to-end encryption. Tap for more info.
                    </p>
                  </div>
                </div>
                {messages.map((m: any) => (
                  <div key={m._id} ref={scrollRef}>
                    <Messages message={m} own={m.senderId === user.id} />
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="bg-Marine_blue px-4 py-4 flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#263238"
                    fillOpacity=".45"
                    d="M1.72 2.705L1 2 0 2.665l.72.705zM1.72 2.705l.774.765 10.42 10.31L6.22 12.59 1.72 2.705z"
                  ></path>
                  <path
                    fill="#263238"
                    fillOpacity=".45"
                    d="M6.22 12.59L12.93 22 15 19.9l-8.78-8.565z"
                  ></path>
                  <path
                    fill="#263238"
                    fillOpacity=".55"
                    d="M22 2H7c-1.1 0-2 .9-2 2v4.02l2 1.96V4h13v16h-6l-2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                  ></path>
                </svg>
              </div>
              <div className="flex-1 mx-4">
                <input
                  type="text"
                  className="w-full border rounded py-2 px-4"
                  placeholder="Type a message"
                  onChange={e => setNewMessage(e.target.value)}
                  value={newMessage}
                  onBlur={() => handleTypingStatus("blur")}
                  onFocus={() => handleTypingStatus("focus")}
                />
              </div>
              {newMessage ? (
                <div>
                  <button
                    onClick={handleSubmit}
                    className="px-2 py-1 bg-varRed text-white rounded"
                  >
                    Send
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent