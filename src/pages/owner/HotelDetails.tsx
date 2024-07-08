import React, { useState, useEffect } from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { OWNER_API, USER_API } from "./../../constants/index"
import OutlinedButton from "../../components/OutlinedButton"
import { useFetchData } from "../../utils/fetcher"

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
  } = hotel?.Hotel

  const handleListUnlist = async (value: string) => {
    try {
      await axios.patch(
        `${OWNER_API}/listUnlist/${id}`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      await reloadHotelDetails()
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

  const saveRoomChanges = async (roomId: string, updatedRoom: any) => {
    try {
      await axios.patch(
        `${OWNER_API}/updateRoom/${id}/${roomId}`,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      setEditingRoomIndex(null)
      await reloadHotelDetails()
    } catch (error) {
      console.error("Failed to update room", error)
    }
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

        <div className="mb-4 col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 p-3">
            Room Details
          </h3>

          {rooms.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-3 px-2">Room Type</th>
                  <th className="text-left py-3 px-2">Description</th>
                  <th className="text-left py-3 px-2">MaxPeoples</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room: any, index: any) => (
                  <tr key={index} className="border-b">
                    {editingRoomIndex === index ? (
                      <>
                        <td className="py-3 px-2">
                          <input
                            title="none"
                            type="text"
                            defaultValue={room.title}
                            onChange={e =>
                              (rooms[index].title = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            title="none"
                            type="text"
                            defaultValue={room.desc}
                            onChange={e => (rooms[index].desc = e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            title="none"
                            type="text"
                            defaultValue={`adults-${room.maxAdults} children-${room.maxChildren}`}
                            onChange={e => {
                              const [adults, children] =
                                e.target.value.split(" ")
                              rooms[index].maxAdults = adults.split("-")[1]
                              rooms[index].maxChildren = children.split("-")[1]
                            }}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            title="none"
                            type="text"
                            defaultValue={room.price}
                            onChange={e =>
                              (rooms[index].price = e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
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
                        <td className="py-3 px-2">
                          adults-{room.maxAdults} children-{room.maxChildren}
                        </td>
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
                          <button
                            title="none"
                            onClick={() => handleListUnlist("true")}
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

                          <button
                            title="none"
                            onClick={() => handleListUnlist("true")}
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
