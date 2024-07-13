import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer" // Adjust the path as per your project structure
import { useFetchData } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import { format } from "date-fns"
import axios from "axios"
import { useSocket } from "../../redux/contexts/SocketContext"
import { useNavigate } from "react-router-dom"
import { noProfile } from "../../assets/images"

interface Notification {
  _id: string
  message: string
  read: boolean
  createdAt: string
  privateMessage?: string
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const user = useSelector((state: RootState) => state.userSlice)
  const navigate = useNavigate()
  const socket = useSocket()
  const {
    data,
    isError: error,
    isLoading: loading,
    mutate,
  } = useFetchData<any>(`${USER_API}/user/${user.id}`)

  useEffect(() => {
    socket?.on("notification", (data: any) => {
      console.log("Received notification:", data)
      setNotifications(prev => [data, ...prev])
    })

    return () => {
      socket?.off("notification")
    }
  }, [socket])

  useEffect(() => {
    if (data) {
      setNotifications(data.user.notifications)
    }
  }, [data])

  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const filteredNotifications = notifications.filter(notification => {
    return value === "1" ? !notification.read : notification.read
  })
  console.log(filteredNotifications);
  

  const handleMarkAsRead = async () => {
    try {
      const result = await axios.patch(
        `${USER_API}/markAllAsRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      console.log(result)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearRead = async () => {
    try {
      const result = await axios.patch(
        `${USER_API}/clearAllRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      console.log(result, "resultttttt")
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const isValidDate = (date: string) => {
    return !isNaN(Date.parse(date))
  }

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const token=localStorage.getItem("access_token")
      console.log(token);
      
      const result = await axios.patch(`${USER_API}/deleteNotification/${notificationId}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Deleted notification:", result);
      // Update notifications state after deletion
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  return (
    <div className="font-Jakarta w-full bg-primary-l-g-blue grid place-items-center md:px-40 lg:px-80">
      <div className="bg-primary-white min-h-screen rounded-lg shadow-2xl w-full shadow-primary-l-g-blue-1">
        <header className="flex justify-between items-center px-3 pt-8 pb-5 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-v-d-blue">
              Notifications
            </h1>
          </div>
        </header>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Unread" value="1" />
                <Tab label="Read" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex flex-col gap-4 px-3 pb-3 md:px-6 md:pb-6 max-h-96 overflow-y-auto no-scrollbar">
                <button
                  className="text-primary-d-g-blue-3 font-bold text-sm duration-300 hover:text-primary-blue"
                  onClick={handleMarkAsRead}
                >
                  Mark all as read
                </button>
                {filteredNotifications.map(notification => (
                  <div
                    className="flex justify-between items-center px-3 py-[10px] rounded-md bg-primary-l-g-blue-1"
                    key={notification._id}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          notification?.data?.image !== ""
                            ? notification.data.image
                            : noProfile
                        }
                        alt="Author Name"
                        className="w-10 h-10 mr-4 cursor-pointer"
                        onClick={() => navigate(notification.data.onClickPath)}
                      />
                      <div
                        onClick={() => navigate(notification.data.onClickPath)}
                      >
                        <div className="text-sm">
                          <p className="inline-block text-primary-d-g-blue-3 mx-1">
                            {notification.message}
                          </p>
                          <span className="ml-3 w-3 h-3 inline-block rounded-full bg-primary-red"></span>
                        </div>
                        <p className="text-sm text-primary-g-blue">
                          {isValidDate(notification.createdAt)
                            ? format(
                                new Date(notification.createdAt),
                                "MMMM do yyyy, h:mm:ss a"
                              )
                            : "Invalid date"}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-primary-d-g-blue-3 font-bold text-sm duration-300 hover:text-primary-blue"
                      onClick={() => handleDeleteNotification(notification._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2" className="overflow-auto">
              <div className="flex flex-col gap-4 px-3 pb-3 md:px-6 md:pb-6 max-h-96 overflow-y-auto no-scrollbar">
                <button
                  className="text-primary-d-g-blue-3 font-bold text-sm duration-300 hover:text-primary-blue"
                  onClick={handleClearRead}
                >
                  Clear All
                </button>
                {filteredNotifications.map(notification => (
                  <div
                    className="flex justify-between items-center px-3 py-[10px] rounded-md bg-primary-l-g-blue-1"
                    key={notification._id}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          notification?.data?.image !== ""
                            ? notification.data.image
                            : noProfile
                        }
                        alt="Author Name"
                        className="w-10 h-10 mr-4 cursor-pointer"
                        onClick={() => navigate(notification.data.onClickPath)}
                      />
                      <div
                        onClick={() => navigate(notification.data.onClickPath)}
                      >
                        <div className="text-sm">
                          <p className="inline-block text-primary-d-g-blue-3 mx-1">
                            {notification.message}
                          </p>
                          <span className="ml-3 w-3 h-3 inline-block rounded-full bg-primary-red"></span>
                        </div>
                        <p className="text-sm text-primary-g-blue">
                          {isValidDate(notification.createdAt)
                            ? format(
                                new Date(notification.createdAt),
                                "MMMM do yyyy, h:mm:ss a"
                              )
                            : "Invalid date"}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-primary-d-g-blue-3 font-bold text-sm duration-300 hover:text-primary-blue"
                      onClick={() => handleDeleteNotification(notification._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

export default Notifications
