import useSWR from "swr"
import axios from "axios"
import { ADMIN_API } from "../../constants"
import moment from "moment"
import { useEffect, useState } from "react"

// Fetcher function using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data)

const useDashboard = () => {
  const { data: booking } = useSWR(`${ADMIN_API}/bookings`, fetcher)
  const { data: userData } = useSWR(`${ADMIN_API}/users`, fetcher)
  const { data: hotelData } = useSWR(`${ADMIN_API}/hotels`, fetcher)
  const { data: ownerData } = useSWR(`${ADMIN_API}/owners`, fetcher)
  let Revenue

    if (booking) {
     Revenue = booking.result.reduce((acc:number, curr:any) => {
        return acc + curr.platformFee
      }, 0)
    }
    
  const userCount = userData?.users.length || "0"
  const ownerCount = ownerData?.users.length || "0"
  const hotelCount = hotelData?.Hotels.length || "0"
  const bookingCount = booking?.result.length || "0"
  const totalRevenue=Revenue||0
  const [graphData, setGraphData] = useState<any>(null)
  const months = 5
  const today = new Date()
  const tempData: any[] = []

  for (let i = 0; i < months; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - (months - (i + 1))
    )
    tempData.push({
      date,
      name: moment(date).format("MMM YYYY"),
      users: 0,
      owners: 0,
      hotels: 0,
    })
  }

  useEffect(() => {
    if (userData) {
      tempData.forEach(month => (month.users = 0))
      userData.users.forEach((user: any) => {
        tempData.forEach(month => {
          if (moment(user.createdAt).isSame(month.date, "month")) {
            month.users++
          }
        })
      })
    }
    setGraphData([...tempData])
  }, [userData, ownerData, hotelData])
  useEffect(() => {
    if (ownerData) {
      tempData.forEach(month => (month.owners = 0))
      ownerData.users.forEach((owner: any) => {
        tempData.forEach(month => {
          if (moment(owner.createdAt).isSame(month.date, "month")) {
            month.owners++
          }
        })
      })
    }
    setGraphData([...tempData])
  }, [userData, ownerData, hotelData])
  useEffect(() => {
    if (hotelData) {
      tempData.forEach(month => (month.hotels = 0))
      hotelData.Hotels.forEach((hotel: any) => {
        tempData.forEach(month => {
          if (moment(hotel.createdAt).isSame(month.date, "month")) {
            month.hotels++
          }
        })
      })
    }
    setGraphData([...tempData])
  }, [userData, ownerData, hotelData])

  return {
    userCount,
    ownerCount,
    hotelCount,
    bookingCount,
    graphData,
    totalRevenue,
  }
}

export default useDashboard
