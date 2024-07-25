import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useFetchData } from "../../utils/fetcher"
import { USER_API } from "../../constants"
import {
  setLoading,
  setError,
  setSearchResult,
  setLength,
} from "../../redux/slices/destinationSlice"
import { setData } from "../../redux/slices/searchingSlice"

const useUserHotels = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [loading, setLoadingState] = useState(true)

  const {
    data: hotelsData,
    isError,
  } = useFetchData<any>(`${USER_API}/hotels`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: () => setLoadingState(false),
    onError: () => setLoadingState(false),
  })

  useEffect(() => {
    if (hotelsData) {
      setLoadingState(false)
    }
    if (isError) {
      dispatch(setError("Failed to fetch hotels"))
      setLoadingState(false)
    }
  }, [hotelsData, isError, dispatch])

  const handleSearch = async (
    destination: string,
    options: { adult: number; children: number; room: number },
    dates: { startDate: Date; endDate: Date }
  ) => {
    dispatch(setLoading(true))
    setLoadingState(true)

    try {
      const { adult, children, room } = options
      const { startDate, endDate } = dates

      const { data } = await axios.get(`${USER_API}/searchedHotels`, {
        params: { destination, adult, children, room, startDate, endDate },
      })

      const searchData = {
        destination,
        dates: [{ startDate, endDate }],
        options,
      }

      dispatch(setSearchResult(data.data.paginatedHotels))
      dispatch(setLength(data.data.totalLength))
      dispatch(setData(searchData))
      navigate("/user/hotels")
    } catch (error) {
      dispatch(setError("Failed to fetch hotels"))
    } finally {
      dispatch(setLoading(false))
      setLoadingState(false)
    }
  }

  return {
    hotels: hotelsData ? hotelsData.Hotels : [],
    destination,
    checkInDate,
    checkOutDate,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    handleSearch,
    loading,
  }
}

export default useUserHotels
