import React, { useState, useEffect } from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { OWNER_API, USER_API } from "./../../constants/index"
import OutlinedButton from "../../components/OutlinedButton"
import { useFetchData } from "../../utils/fetcher"
import { addButton } from "../../assets/images"
import { offer } from "./../../../../backend/src/app/use-cases/Owner/hotel"
import showToast from "../../utils/toast"

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    data: hotel,
    isError: error,
    isLoading: loading,
    mutate,
  } = useFetchData<any>(`${USER_API}/hotelDetails/${id}`)
  console.log(hotel, "............................")

  const [editingRoomIndex, setEditingRoomIndex] = useState<number | null>(null)
  const [rooms, setRooms] = useState<any[]>(hotel?.Hotel?.rooms || [])

  useEffect(() => {
    if (hotel?.Hotel) {
      setRooms(hotel?.Hotel?.rooms)
    }
  }, [hotel])

  const reloadHotelDetails = async () => {
    await mutate() // Re-fetch the data
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading hotel details.</p>
  if (!hotel) return <p>No hotel details available.</p>

  const {
    name,
    destination,
    description,
    stayType,
    address,
    amenities,
    propertyRules,
    imageUrls,
    isListed,
    isVerified,
    Reason,
    offer,
  } = hotel?.Hotel

  const handleListUnlist = async (value: string, roomId?: string) => {
    try {
      const url = roomId
        ? `${OWNER_API}/roomListUnlist/${roomId}`
        : `${OWNER_API}/hotelListUnlist/${id}`
      const response = await axios.patch(
        url,
        { value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      showToast(response.data.message, "success")
      await reloadHotelDetails()
    } catch (error) {
      console.error("Failed to update listing status", error)
    }
  }

  const handleRemoveOffer = async () => {
    try {
      console.log("hooo")

      const response = await axios.patch(
        `${OWNER_API}/removeOffer/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      await reloadHotelDetails()
      showToast(response.data.message, "success")
    } catch (error) {
      console.error("Failed to update hotel listing status", error)
    }
  }

  const handleEditRoom = (index: number) => {
    setEditingRoomIndex(index)
  }

  const handleRemoveRoom = async (roomId: string) => {
    try {
      await axios.delete(`${OWNER_API}/deleteRoom/${id}/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      await reloadHotelDetails()
    } catch (error) {
      console.error("Failed to remove room", error)
    }
  }

  const validateRoomData = (roomData: any) => {
    if (!roomData.title || roomData.title.trim() === "") {
      showToast("Room title is required", "error")
      return false
    }
    if (!roomData.price || isNaN(roomData.price) || roomData.price <= 0) {
      showToast("Valid Price  is required", "error")
      return false
    }
    if (!roomData.desc || roomData.desc.trim() === "") {
      showToast("Description is required", "error")
      return false
    }
    if (
      !roomData.maxAdults ||
      isNaN(roomData.maxAdults) ||
      roomData.maxAdults <= 0
    ) {
      showToast("Valid number is required", "error")
      return false
    }
    if (
      !roomData.maxChildren ||
      isNaN(roomData.maxChildren) ||
      roomData.maxChildren <= 0
    ) {
      showToast("Valid number is required", "error")
      return false
    }
    return true
  }

  const saveRoomChanges = async (roomId: string, updatedRoom: any) => {
    try {
      console.log(roomId)
      console.log(updatedRoom)
      if (!validateRoomData(updatedRoom)) {
        return
      }
      const response = await axios.patch(
        `${OWNER_API}/editRoom/${roomId}`,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      setEditingRoomIndex(null)
      await reloadHotelDetails()
      showToast(response.data.message, "success")
    } catch (error) {
      console.error("Failed to update room", error)
    }
  }

  const handleAddRoom = () => {
    navigate("/owner/addrooms")
  }

  return (
    <div className="max-w-6xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="flex justify-center font-bold text-4xl text-varBlue mb-4">
        Hotel Details
      </h1>
      {isVerified === "rejected" && (
        <span className="flex justify-center text-lg bg-red-500 rounded-md">
          "Your hotel is rejected"---{Reason}
        </span>
      )}
      <div className="grid grid-cols-2 md:grid-rows-1">
        <div className="p-6 bg-blue-gray-50 w-full">
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h2 className="text-xl font-semibold text-gray-800">
              Hotel Name :
            </h2>
            <p className="text-base text-gray-600">{name}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h2 className="text-xl font-semibold text-gray-800">
              Destination :
            </h2>
            <p className="text-base text-gray-600">{destination}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Stay Type :</h3>
            <p className="text-base text-gray-600">{stayType}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Address :</h3>
            <div>
              <p className="text-base text-gray-600">{address.streetAddress}</p>
              <p className="text-base text-gray-600">{address.landMark}</p>
              <p className="text-base text-gray-600">
                {address.city}, {address.district}
              </p>
              <p className="text-base text-gray-600">
                {address.country} - {address.pincode}
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800 ">
              Description :
            </h3>
            <p className="text-base text-gray-600 px-2">{description}</p>
          </div>

          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Amenities :</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity: string, index: any) => (
                <li key={index} className="text-base text-gray-600">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">
              Property Rules :
            </h3>
            <ul className="list-disc pl-5">
              {propertyRules.map((rule: string, index: any) => (
                <li key={index} className="text-base text-gray-600">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-blue-gray-50 w-full">
          <div className="p-6 grid grid-cols-2 gap-4">
            {imageUrls.map((image: string, index: any) => (
              <img
                key={index}
                className="w-full h-40 object-cover rounded-lg"
                src={image} // replace with the actual image URL
                alt={`Hotel ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className=" col-span-2 border mb-5 shadow-md">
          {offer && (
            <h3 className="text-xl font-semibold text-gray-800 p-3">
              Added Offer
            </h3>
          )}
          {offer && (
            <div>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left py-3 px-2">Offer Type</th>
                    <th className="text-left py-3 px-2">Description</th>
                    <th className="text-left py-3 px-2">Amount</th>
                    {offer && offer.type === "flat" && (
                      <th className="text-left py-3 px-2">Min Amount</th>
                    )}
                    {offer && offer.type === "flat" && (
                      <th className="text-left py-3 px-2">Max Amount</th>
                    )}

                    <th className="text-left py-3 px-2">Start Date</th>
                    <th className="text-left py-3 px-2">End Date</th>
                    <th className="text-left py-3 px-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-2">{offer.type}</td>
                    <td className="py-3 px-2">{offer.desc}</td>
                    <td className="py-3 px-2">{offer.amount}</td>
                    {offer && offer.type === "flat" && (
                      <td className="py-3 px-2">{offer.minAmount}</td>
                    )}
                    {offer && offer.type === "flat" && (
                      <td className="py-3 px-2">{offer.maxAmount}</td>
                    )}{" "}
                    <td className="py-3 px-2">
                      {offer.startDate
                        ? new Date(offer.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : ""}
                    </td>
                    <td className="py-3 px-2">
                      {offer.endDate
                        ? new Date(offer.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </td>
                    <td className="py-3 px-2 flex justify-center">
                      {" "}
                      <button title="none" onClick={() => handleRemoveOffer()}>
                        <svg
                          className="w-[30px] h-[30px] fill-[#8f2424]"
                          viewBox="0 0 448 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mb-4 col-span-2 border border-spacing-2 shadow-md p-2 pb-5">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold text-gray-800 p-3">Rooms</h3>
            <div className="p-2">
              <button
                className="text-sm bg-varGreen p-2 flex gap-1 rounded-md hover:bg-varRed hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={handleAddRoom}
              >
                <img src={addButton} alt="" className="h-4" />
                <span className="font-semibold">Add Room</span>
              </button>
            </div>
          </div>
          {rooms.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-3 px-2 w-1/6">Room Type</th>
                  <th className="text-left py-3 px-2 w-2/6">Description</th>
                  <th className="text-left py-3 px-2 w-1/6">MaxAdults</th>
                  <th className="text-left py-3 px-2 w-1/6">MaxChildrens</th>
                  <th className="text-left py-3 px-2 w-1/6">Price</th>
                  <th className="text-left py-3 px-2 w-1/6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room: any, index: any) => (
                  <tr key={index} className="border-b">
                    {editingRoomIndex === index ? (
                      <>
                        <td className="py-3 px-2 w-1/6">
                          <input
                            title="none"
                            className="w-full"
                            type="text"
                            defaultValue={room.title}
                            onChange={e =>
                              (rooms[index].title = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2 w-2/6">
                          <input
                            className="w-full"
                            title="none"
                            type="text"
                            defaultValue={room.desc}
                            onChange={e => (rooms[index].desc = e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-2 w-1/6">
                          <input
                            className="w-full"
                            title="none"
                            type="number"
                            min={1}
                            defaultValue={room.maxAdults}
                            onChange={e =>
                              (rooms[index].maxAdults = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2 w-1/6">
                          <input
                            className="w-full"
                            title="none"
                            type="text"
                            defaultValue={room.maxChildren}
                            onChange={e =>
                              (rooms[index].maxChildren = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2 w-1/6">
                          <input
                            className="w-full"
                            title="none"
                            type="text"
                            defaultValue={room.price}
                            onChange={e =>
                              (rooms[index].price = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2 w-1/6 flex">
                          <button
                            className="text-sm text-white bg-green-500 px-4 py-2 rounded-md mr-2"
                            onClick={() =>
                              saveRoomChanges(room._id, rooms[index])
                            }
                          >
                            Save
                          </button>
                          <button
                            className="text-sm text-white bg-red-500 px-4 py-2 rounded-md"
                            onClick={() => setEditingRoomIndex(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-2">{room.title}</td>
                        <td className="py-3 px-2">{room.desc}</td>
                        <td className="py-3 px-2">{room.maxAdults}</td>
                        <td className="py-3 px-2">{room.maxChildren}</td>
                        <td className="py-3 px-2">{room.price}</td>
                        <td className="py-3 px-2">
                          <button
                            title="none"
                            onClick={() => handleEditRoom(index)}
                          >
                            <svg
                              className="w-[29px] h-[29px] fill-[#000000]"
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"></path>
                            </svg>
                          </button>
                          {room.listed && (
                            <button
                              title="none"
                              onClick={() =>
                                handleListUnlist("false", room._id)
                              }
                            >
                              <svg
                                className="w-[30px] h-[30px] fill-[#8f2424]"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path>
                              </svg>
                            </button>
                          )}
                          {!room.listed && (
                            <button
                              title="none"
                              onClick={() => handleListUnlist("true", room._id)}
                            >
                              <svg
                                className="w-[30px] h-[30px] fill-[#2a8d43]"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                              </svg>
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="flex justify-center text-2xl text-varRed">
              No rooms added
            </span>
          )}
        </div>
        <div className="text-right col-span-2 mx-16 mb-10 flex justify-between pt-10">
          {isVerified === "rejected" ? (
            <OutlinedButton
              onclick={() => navigate(`/owner/editHotel/${id}`)}
              color={"blue"}
              text={"Edit Hotel And REsubmit"}
            />
          ) : (
            ""
          )}

          {isListed ? (
            <OutlinedButton
              onclick={() => handleListUnlist("false")}
              color={"red"}
              text={"unList"}
            />
          ) : (
            <OutlinedButton
              onclick={() => handleListUnlist("true")}
              color={"green"}
              text={"List"}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelDetails
