import React, { useEffect, useState } from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { RoomInterface } from "./../../../../backend/src/types/RoomInterface"
import { clearData, setCheckoutData } from "../../redux/slices/bookingslice"
import { useAppSelector } from "../../redux/store/store"
import Image from "../../components/Image"
import SearchBoxDetail from "../../components/user/SearchInDetail"
import ReviewCard from "../../components/user/Review/ReviewCard"
import { useFetchData } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import { noProfile } from "../../assets/images"
import { Review } from "../../types/reviewInterface"
import StarComponent from "../../components/user/Review/StarComponent"
import axios from "axios"
import showToast from "../../utils/toast"
import EditReview from "../../components/EditReview"

interface RoomSelection {
  roomId: string
  count: number
}

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  console.log(id, "hotel id")
  const { hotel, loading, error } = useHotelDetails(id)
  const [err, setErr] = useState("")
  console.log(hotel, "hotel in hotel details")
  const searchingData = useAppSelector(state => state.searchingSlice)
  const user = useAppSelector(state => state.userSlice)
  console.log(searchingData, "searchingData")
  const [review, setReview] = useState<Review[] | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [roomSelections, setRoomSelections] = useState<RoomSelection[]>([])
  const [submitting, setSubmitting] = useState(false)
  const { data } = useFetchData<any>(`${USER_API}/getRating/${id}`)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)

  const today = new Date()

  useEffect(() => {
    dispatch(clearData())
  }, [])
  useEffect(() => {
    console.log(data, "review.......")

    if (data) {
      setReview(data.result)
    }
  }, [data])
  const sumOfRatings = review
    ? review.reduce((acc, curr) => acc + curr.rating, 0)
    : 0
  const avgRatings = sumOfRatings && review ? sumOfRatings / review.length : 0

  console.log(sumOfRatings, "sum of ratings.........")
  console.log(avgRatings)

  console.log(review, "😆")

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error loading hotel details</div>
  }
  if (!hotel) {
    return <div>No hotel data available</div>
  }
  const availableRooms = hotel?.rooms

  const {
    name,
    imageUrls,
    destination,
    description,
    amenities,
    propertyRules,
    stayType,
    address,
    offer,
  } = hotel

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    roomId: string
  ) => {
    const { value } = e.target
    setErr("")
    const count = parseInt(value, 10)

    if (count === 0) {
      // Remove the room from the roomSelections state
      setRoomSelections(prevSelections =>
        prevSelections.filter(selection => selection.roomId !== roomId)
      )
    } else {
      // Create an array of room numbers based on the selected count
      setRoomSelections(prevSelections => {
        const existingSelection = prevSelections.find(
          selection => selection.roomId === roomId
        )
        if (existingSelection) {
          // Update the existing selection
          return prevSelections.map(selection =>
            selection.roomId === roomId ? { ...selection, count } : selection
          )
        } else {
          // Add a new selection
          return [...prevSelections, { roomId, count }]
        }
      })
    }
  }

  const checkAvilability = async (
    roomId: string,
    count: number,
    startDate: any,
    endDate: any
  ) => {
    const response = await axios.post(
      USER_API + "/checkAvailability/" + roomId,
      {
        count,
        dates: {
          checkInDate: startDate,
          checkOutDate: endDate,
        },
      }
    )
    return response.data.RoomAvailable
  }
  const discountedPrice = (price: number) => {
    if (offer.type === "flat") {
      if (
        price >= (offer.minAmount ?? 0) &&
        price <= (offer.maxAmount ?? Infinity)
      ) {
        return price - offer.amount
      }
      return null
    } else {
      return (price * (100 - offer.amount)) / 100
    }
  }

  const handleEdit = (id: string) => {
    setSelectedReviewId(id)
    setShowReviewModal(true)
  }

  const handleReserve = async () => {
    console.log(roomSelections)
    if (roomSelections.length === 0) {
      setErr("Please select at least one room")
      return
    }

    setSubmitting(true)
    // try {
    const availabilityPromises = roomSelections.map(({ roomId, count }) =>
      checkAvilability(
        roomId,
        count,
        searchingData.dates[0].startDate,
        searchingData.dates[0].endDate
      )
    )

    const availabilityResults = await Promise.all(availabilityPromises)
    console.log(availabilityResults)

    for (const data of availabilityResults) {
      if (data === undefined) {
        showToast("something went wrong, please select room once more", "error")
        return
      }
    }

    const data = {
      name: hotel?.name ?? "",
      destination: hotel?.destination ?? "",
      city: hotel?.address.city ?? "",
      district: hotel?.address.district ?? "",
      pincode: hotel?.address.pincode ?? "",
      country: hotel?.address.country ?? "",
      hotelId: hotel?._id ?? "",
      rooms: availabilityResults,
      checkIn: searchingData.dates[0].startDate,
      checkOut: searchingData.dates[0].endDate,
      adults: searchingData.options.adult,
      children: searchingData.options.children,
      offer: hotel?.offer,
      cancellationPolicies: hotel?.cancellationPolicies,
    }

    console.log(data)
    dispatch(setCheckoutData(data))

    const dataToSend = availabilityResults.map(result => ({
      roomId: result.roomDetails?._id ?? "",
      roomNumbers: result.rooms
        ? result.rooms.map((room: any) => room.number)
        : [],
    }))
    const result = await axios.post(
      USER_API + "/addUnavilableDates",
      {
        rooms: dataToSend,
        checkInDate: searchingData.dates[0].startDate,
        checkOutDate: searchingData.dates[0].endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    if (result) {
      navigate(`/user/checkout/${hotel._id}`)
    }
    setSubmitting(false)
  }

  const handleCloseReviewModal = async () => {
    setSelectedReviewId(null)
    setShowReviewModal(false)
  }

  if (showAllPhotos) {
    return (
      <div className=" absolute pt-48 inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50 ">
        <div className="relative bg-white p-8 rounded-lg max-w-3xl w-full">
          <button
            title="button"
            onClick={() => setShowAllPhotos(false)}
            className="absolute top-4 right-4 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h2 className="text-2xl mb-4">Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url: string, index: number) => (
              <div key={index} className="flex justify-center items-center">
                <Image
                  src={url}
                  alt={`Photo ${index}`}
                  width={600}
                  height={400}
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          <div className="col-span-3">
            <img
              src={imageUrls[0]}
              alt="Houseboat"
              className="w-full h-80 aspect-auto rounded-lg"
            />
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-2 relative">
            {imageUrls.slice(1, 5).map((url: string, index: number) => (
              <div key={index} className="">
                <img
                  src={url}
                  alt={`Houseboat ${index + 1}`}
                  className="w-full h-40 aspect-auto r rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => setShowAllPhotos(true)}
              className="right-5 absolute bottom-5 bg-gray-300 px-3 rounded-lg"
            >
              show all
            </button>
          </div>
        </div>
        <div>
          {" "}
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          {review ? (
            <div className="flex items-center mb-2 gap-2">
              <StarComponent stars={avgRatings} />
              <span className="text-gray-600">
                {review.length
                  ? `(${review.length} reviews)`
                  : `(not yet rated )`}
              </span>
            </div>
          ) : (
            ""
          )}
          <p className="text-gray-700 mb-2">{stayType.name}</p>
          <p className="text-gray-600 mb-2">{destination}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-4 md:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                What this place offers
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                {amenities.map((amenity: string, index: number) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 ">
            <div className="flex justify-center p-3"></div>
            <div className="mb-4 p-5  border rounded-lg ring-2  ">
              <h2 className="text-xl font-semibold mb-2"> Address</h2>
              <div className="mb-4">
                <p className="text-gray-800 mb-1">
                  {address.streetAddress} , {address.landMark}
                </p>

                <p className="text-gray-600 mb-1">{address.city}</p>
                <p className="text-gray-600 mb-1">{address.district}</p>
                <p className="text-gray-600 mb-1">
                  {address.country} , {address.pincode}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Property Rules</h2>
              <ul className="list-disc list-inside text-gray-600">
                {propertyRules.map((rule: string, index: number) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className=" pt-16">
          <SearchBoxDetail id={id} />
        </div>
        <div className="py-4 md:px-4 md:py-1 ">
          <div className="hidden md:block">
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead>
                <tr className="w-full bg-gray-100">
                  <th className="py-2 px-4 border-r">Room Types</th>
                  <th className="py-2 px-4 border-r">Number of guests</th>
                  <th className="py-2 px-4 border-r">Price per night</th>
                  <th className="py-2 px-4 border-r">No of rooms</th>
                </tr>
              </thead>
              <tbody>
                {availableRooms.map((item: RoomInterface) => (
                  <tr className="border-b " key={item._id}>
                    <td className="py-4 px-4 border-r">
                      <h3 className="text-lg font-semibold text-varRed">
                        {item.title}
                      </h3>
                      <p className="text-green-600">{item.desc}</p>
                      {/* <p className="text-red-600">Only 3 left on our site</p> */}
                    </td>
                    <td className="py-4 px-4 border-r">
                      <div className="flex items-center">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                          <svg
                            className="inline-block h-6 w-6 mr-1 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a6 6 0 016 6 6 6 0 01-2 4.472V15h1.5a1.5 1.5 0 110 3H4.5a1.5 1.5 0 110-3H6v-2.528A6 6 0 1110 2zM4 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                          </svg>
                          {item.maxAdults}
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                          <svg
                            className="inline-block h-6 w-6 mr-1 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M12 12h6.5a1.5 1.5 0 110 3H1.5a1.5 1.5 0 110-3H6v-1.528A6 6 0 119.528 2H12a6 6 0 110 12z" />
                          </svg>
                          {item.maxChildren}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 border-r w-fit ">
                      {offer && new Date(offer.endDate) >= today ? (
                        discountedPrice(item.price) !== null ? (
                          <>
                            <span className="text-sm  text-gray-600 line-through flex justify-center py-2">
                              ₹ {item.price}
                            </span>
                            <span className="text-lg font-bold text-gray-700 flex justify-center pb-3">
                              ₹ {discountedPrice(item.price)}
                            </span>
                            <span className="text-xs  text-varWhite bg-varGreen flex justify-center w-fit p-0.5 rounded-md ">
                              {offer.type === "flat"
                                ? `FLAT ₹  ${offer.amount} off/-`
                                : `${offer.amount}% off/-`}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-700 flex justify-center">
                            ₹ {item.price}
                          </span>
                        )
                      ) : (
                        <span className="text-lg font-bold text-gray-700 flex justify-center">
                          ₹ {item.price}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 border-r">
                      <select
                        title="select"
                        className="border p-2 rounded"
                        onChange={e => handleSelectChange(e, item._id)}
                      >
                        {Array.from(
                          { length: item.roomNumbers.length + 1 },
                          (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {availableRooms.map((item: RoomInterface) => (
              <div
                className="border border-gray-200 mb-4 p-4 rounded-lg shadow-md"
                key={item._id}
              >
                <h3 className="text-xl font-semibold text-Marine_blue">
                  {item.title}
                </h3>
                <p className="text-green-600 text-sm my-2">{item.desc}</p>
                <div className="flex items-center mt-2">
                  <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2">
                    <svg
                      className="inline-block h-6 w-6 mr-1 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 016 6 6 6 0 01-2 4.472V15h1.5a1.5 1.5 0 110 3H4.5a1.5 1.5 0 110-3H6v-2.528A6 6 0 1110 2zM4 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                    {item.maxAdults}
                  </div>
                  <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    <svg
                      className="inline-block h-6 w-6 mr-1 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12 12h6.5a1.5 1.5 0 110 3H1.5a1.5 1.5 0 110-3H6v-1.528A6 6 0 119.528 2H12a6 6 0 110 12z" />
                    </svg>
                    {item.maxChildren}
                  </div>
                </div>
                <div className="mt-4 ">
                  {offer && new Date(offer.endDate) >= today ? (
                    discountedPrice(item.price) !== null ? (
                      <>
                        <div className="flex justify-between">
                          {" "}
                          <span className="text-sm text-gray-600 line-through flex justify-center py-2">
                            ₹ {item.price}
                          </span>
                          <span className="text-lg font-bold text-gray-700 flex justify-center pb-3">
                            ₹ {discountedPrice(item.price)}
                          </span>
                        </div>
                        <div>
                          <span className="text-Strawberry_red">
                            {" "}
                            {offer.desc}
                          </span>

                          <span className="text-xs text-varWhite bg-varGreen flex justify-center w-fit p-0.5 rounded-md">
                            {offer.type === "flat"
                              ? `FLAT ₹ ${offer.amount} off/-`
                              : `${offer.amount}% off/-`}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-700 flex justify-center">
                        ₹ {item.price}
                      </span>
                    )
                  ) : (
                    <span className="text-lg font-bold text-gray-700 flex justify-center">
                      ₹ {item.price}
                    </span>
                  )}
                </div>
                <p className="mt-2">select no of rooms</p>
                <div className="">
                  <select
                    title="select"
                    className="border p-2 rounded w-full"
                    onChange={e => handleSelectChange(e, item._id)}
                  >
                    {Array.from(
                      { length: item.roomNumbers.length + 1 },
                      (_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="py-4 flex justify-center">
            {availableRooms.length > 0 ? (
              <button
                disabled={submitting ? true : false}
                className={
                  submitting
                    ? "px-4 py-2 bg-gray-500 text-black rounded"
                    : "px-4 py-2 bg-blue-500 text-white rounded"
                }
                onClick={handleReserve}
              >
                I'll reserve
              </button>
            ) : (
              <span className="text-varRed text-xl">no rooms available</span>
            )}
          </div>
          <span className="text-varRed flex justify-center">{err}</span>
        </div>
      </div>
      {review && review.length && (
        <div className="pt-5 m-2 border ">
          <p className="flex justify-center text-2xl py-10">
            Customer Review & Ratings
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <div className="w-full border mx-2 p-4 rounded-lg   shadow-lg">
                <ReviewCard review={review} />
              </div>
            </div>
            <div className="col-span-2">
              {review &&
                review.map(r => (
                  <div
                    key={r?._id}
                    className="flex flex-col border rounded-lg shadow-md p-4 space-y-4 w-full"
                  >
                    <StarComponent stars={r.rating} />
                    <div className="flex items-center space-x-4">
                      <img
                        className="rounded-full w-6 h-6"
                        src={
                          r?.userId?.profilePic
                            ? r?.userId?.profilePic
                            : noProfile
                        }
                        alt={`${r?.userId?.name}'s Avatar`}
                      />
                      <div className="flex justify-between w-full">
                        <div className=" text-blue-800 text-xl font-bold">
                          {r?.userId?.name}
                        </div>
                        <div className="text-gray-400">
                          {" "}
                          {r?.createdAt && (
                            <>
                              {new Date(r.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-2 space-x-2">
                      {r?.imageUrls.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Preview ${index}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-500 text-xl font-thin">
                      {r?.description}
                    </p>
                    <p
                      onClick={() => handleEdit(r?._id)}
                      className="flex justify-end"
                    >
                      {r?.userId?._id === user.id ? <>edit</> : ""}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {showReviewModal && (
        <div className="absolute inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
          {selectedReviewId && (
            <EditReview
              reviewId={selectedReviewId}
              onClose={handleCloseReviewModal}
            />
          )}
        </div>
      )}
    </>
  )
}

export default HotelDetail
