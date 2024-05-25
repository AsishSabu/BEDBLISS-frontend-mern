import { useEffect, useState } from "react"
import { ADMIN_API } from "../../constants"
import axios from "axios"

const useDashboard = () => {
  const [userCount,setUserCount]=useState("0")
  const [ownerCount,setOwnerCount]=useState("0")
  const [hotelCount,setHotelCount]=useState("0")
  const [bookingCount,setBookingCount]=useState("0")

  useEffect(()=>{
    axios
    .get(ADMIN_API + "/counts")
    .then(({ data }) => {        
      console.log(data, "data")
      setUserCount(data.userCount)
      setOwnerCount(data.ownerCount)
      setHotelCount(data.hotelCount)

    })
    .catch((error) => console.log(error))
}, [])

  
  return{
      userCount,
      ownerCount,
      hotelCount,
      bookingCount
  }
  
}


export default useDashboard
