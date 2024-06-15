import axios from "axios"
import { useState } from "react"
import useSWR from "swr"
import { USER_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  setLoading,
  setError,
  setSearchResult,
} from "../../redux/slices/destinationSlice"
import { fetcher } from "../../utils/fetcher"

const useUserHotels = () => {
  const dispatch = useDispatch()
  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const navigate = useNavigate()

  const { data: hotelsData, error } = useSWR(`${USER_API}/hotels`, fetcher)

  type optionType = {
    adult: number
    children: number
    room: number
  }

  type datesTypes={
    startDate: string;
    endDate: string;
    
  };

  const handleSearch = async (destination: string, options:optionType, dates:datesTypes) => {
    console.log(destination, "destination........")
    console.log(options, "options..........")
    console.log(dates, "dates......")

    dispatch(setLoading(true))
    try {
      const { adult, children, room } = options;
      const { startDate, endDate } = dates;
      console.log(startDate, "startDates......")
      console.log(endDate, "endDates......")
  
      const { data } = await axios.get(`${USER_API}/searchedHotels`, {
        params: {
          destination,
          adult,
          children,
          room,
          startDate,
          endDate,
        },
      });
      dispatch(setSearchResult(data.data));
      console.log(data.data);
      navigate("/user/hotels")
    } catch (error) {
      dispatch(setError("Failed to fetch hotels"))
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  if (error) {
    dispatch(setError("Failed to fetch hotels"))
    console.error(error)
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
  }
}

export default useUserHotels
