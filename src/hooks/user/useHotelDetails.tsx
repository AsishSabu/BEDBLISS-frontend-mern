import useSWR from "swr"
import axios from "axios"
import { USER_API } from "../../constants"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const useHotelDetails = (id: string | undefined) => {
  const { data, error,mutate } = useSWR(`${USER_API}/hotelDetails/${id}`, fetcher)

  const reloadHotelDetails = async () => {
    try {
      await mutate()
    } catch (error) {
      console.error("Error reloading hotel details:", error)
    }
  }

  return {
    hotel: data?.Hotel,
    loading: !error && !data,
    error: error,
    reloadHotelDetails
  }
}

export default useHotelDetails
