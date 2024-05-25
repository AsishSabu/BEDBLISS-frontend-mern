import axios from "axios"
import { useEffect, useState } from "react"
import { USER_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchValue, setLoading, setError } from "../../redux/slices/destinationSlice"

const useUserHotels = () => {
  const dispatch = useDispatch()
  const [hotels, setHotels] = useState<HotelInterface[]>([])
  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const navigate = useNavigate()

  const handleSearch = async () => {
    dispatch(setLoading(true))
    try {
      const { data } = await axios.get(`${USER_API}/searchedHotels`, {
        params: {
          destination,
          checkInDate,
          checkOutDate,
        },
      })
      dispatch(setSearchValue(data.data))
      console.log(data.data);
      
      navigate("/user/hotels")
    } catch (error) {
      dispatch(setError("Failed to fetch hotels"))
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${USER_API}/hotels`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        setHotels(data.Hotels)
      } catch (error) {
        setError("Failed to fetch hotels")
        console.error(error)
      }
    }

    fetchHotels()
  }, [])

  return {
    hotels,
    destination,
    checkInDate,
    checkOutDate,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    handleSearch,
  }
}

export default useUserHotels
