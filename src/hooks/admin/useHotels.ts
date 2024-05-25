import { useEffect, useState } from "react"
import axios from "axios"
import { ADMIN_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"

const useHotels = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([])
  useEffect(() => {
    axios
      .get(ADMIN_API + "/hotels")
      .then(({ data }) => {
        console.log(data, "data")

        const { Hotels } = data
       setHotels(Hotels)
        
      })
      .catch((error) => console.log(error))
  }, [setHotels])
  return {
    hotels
  }
}

export default useHotels
