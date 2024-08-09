import React, { useState, useRef, useEffect } from "react"
import useHotelList from "../../hooks/owner/UseHotelList"
import axios from "axios"
import { OWNER_API } from "../../constants"
import StarComponent from "../../components/user/Review/StarComponent"
import { noProfile } from "../../assets/images"

// Define types for hotel and state
interface Hotel {
  _id: string
  imageUrls: string[]
  name: string
}

interface Review {
  _id: string
  userId: {
    profilePic?: string
    name: string
  }
  createdAt: string
  rating: number
  imageUrls: string[]
  description: string
  reply?: string
}

const Reviews: React.FC = () => {
  const { hotels } = useHotelList()
  const [current, setCurrent] = useState<Review[] | null>(null)
  const [replyText, setReplyText] = useState<string>("")
  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null)
  const [editedReplyText, setEditedReplyText] = useState<string>("")
  const [currentHotelId, setCurrentHotelId] = useState<string | null>(null)
  const replyFormRef = useRef<HTMLDivElement | null>(null)

  const onClick = async (id: string) => {
    try {
      setCurrentHotelId(id) // Set the current hotel ID
      const response = await axios.get(`${OWNER_API}/getRatings/${id}`)
      setCurrent(response.data.result)
    } catch (error) {
      console.error("Error fetching ratings:", error)
    }
  }

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value)
  }

  const handleReplySubmit = async (reviewId: string) => {
    try {
      await axios.patch(`${OWNER_API}/updateRatingById/${reviewId}`, {
        reply: replyText,
      })
      setReplyText("") // Clear the input field after submission
      setSelectedReview(null) // Close the reply form
      if (currentHotelId) {
        const response = await axios.get(`${OWNER_API}/getRatings/${currentHotelId}`)
        setCurrent(response.data.result)
      }
    } catch (error) {
      console.error("Error submitting reply:", error)
    }
  }

  const handleEditReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReplyText(e.target.value)
  }

  const handleEditReplySubmit = async (reviewId: string) => {
    try {
      await axios.patch(`${OWNER_API}/updateRatingById/${reviewId}`, {
        reply: editedReplyText,
      })
      if (currentHotelId) {
        const response = await axios.get(`${OWNER_API}/getRatings/${currentHotelId}`)
        setCurrent(response.data.result)
      }
      setEditingReplyId(null) // Exit edit mode
      setEditedReplyText("") // Clear the edited text
    } catch (error) {
      console.error("Error editing reply:", error)
    }
  }

  // Close reply form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        replyFormRef.current &&
        !replyFormRef.current.contains(event.target as Node)
      ) {
        setSelectedReview(null)
        setEditingReplyId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="pt-2">
      <div className="flex bg-white dark:bg-gray-900 p-5">
        <div className="h-screen bg-varGrey border shadow-md p-2 hidden md:block w-80">
          <div>
            {hotels.map((hotel: Hotel) => (
              
              <div
                key={hotel._id}
                onClick={() => onClick(hotel._id)}
                className="conversation-item p-3 my-5 dark:bg-gray-700 bg-varBlueGray hover:bg-gray-200 m-1 rounded-md"
              >
                <div className="flex items-center p-2 cursor-pointer">
                  <div className="w-10 h-10 m-1">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={hotel.imageUrls[0] || "path/to/default/image.png"}
                      alt={hotel.name || "Hotel Image"}
                    />
                  </div>
                  <div className="flex-grow p-2">
                    <div className="flex justify-between text-md">
                      <div className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        {hotel.name}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-300">
                        5
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow h-svh p-2 rounded-md md:block hidden">
          {current&&current.length>0?
            current.map((r: Review) => (
              <div
                key={r._id}
                className="flex flex-col border rounded-lg shadow-md p-4 space-y-2 w-full my-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="rounded-full w-6 h-6"
                    src={r.userId.profilePic || noProfile}
                    alt={`${r.userId.name}'s Avatar`}
                  />
                  <div className="flex justify-between w-full"> 
                    <div className="text-black text-md font-bold">
                      {r.userId.name}
                    </div>
                    <div className="text-gray-400">
                      {r.createdAt && (
                        <>
                          {new Date(r.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <StarComponent stars={r.rating} />
                <div className="flex space-x-2">
                  {r.imageUrls.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-varGreen text-xl font-thin">
                  {r.description}
                </p>

                <p className="flex justify-end">
                  {!r.reply ? (
                    <button
                      onClick={() => setSelectedReview(r._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Reply
                    </button>
                  ) : editingReplyId === r._id ? (
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        value={editedReplyText}
                        onChange={handleEditReplyChange}
                        placeholder="Edit your reply..."
                        className="border rounded-md p-2 w-full"
                      />
                      <button
                        onClick={() => handleEditReplySubmit(r._id)}
                        className="bg-blue-500 text-white rounded-md p-2"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center ">
                      <p className="text-Strawberry_red text-base font-thin">{r.reply}</p>
                      <button
                      title="button"
                        onClick={() => {
                          setEditingReplyId(r._id)
                          setEditedReplyText(r.reply || "")
                        }}
                        className="text-black hover:underline"
                      >
                       <svg className="feather feather-edit-2" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      </button>
                    </div>
                  )}
                </p>
                
                {selectedReview === r._id && (
                  <div className="mt-4" ref={replyFormRef}>
                    <input
                      type="text"
                      value={replyText}
                      onChange={handleReplyChange}
                      placeholder="Write a reply..."
                      className="border rounded-md p-2 w-full"
                    />
                    <button
                      onClick={() => handleReplySubmit(r._id)}
                      className="mt-2 bg-blue-500 text-white rounded-md p-2"
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </div>
            )):(
              <p className="text-center text-gray-500">No reviews available.</p>
            )}
        </div>
      </div>
    </div>
  )
}

export default Reviews
