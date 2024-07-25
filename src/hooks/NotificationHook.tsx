import { useCallback } from "react"
import axios from "axios"
import { useSocket } from "../redux/contexts/SocketContext"
import { USER_API } from "../constants"


interface UserState{
    name:string|null;
    isAuthenticated:boolean|null;
    role:string|null;
    id?:string|null;
    notification?:number|null;
    image?:string|null;
}



export const useNotification = () => {
  const socket = useSocket()

  const sendNotification = useCallback(async (message: string, path: string, user: UserState, receiverId: string,type:number) => {
    const notification = {
      type: type,
      message: message,
      data: {
        senderId: user.id,
        name: user.name,
        image: user.image,
        onClickPath: path,
      },
    }
    const socketNotification = {
      type: type,
      message: message,
      data: {
        senderId: user.id,
        name: user.name,
        image: user.image,
        onClickPath: path,
      },
      createdAt: new Date(Date.now()),
    }

    socket?.emit("noti", socketNotification, receiverId)
    axios.patch(
      `${USER_API}/addNotification/${receiverId}`,
      notification,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
  }, [socket])

  return { sendNotification }
}
