import useSWR from "swr";
import axios from "axios";
import { USER_API } from "../../constants";
import { useAppSelector } from "../../redux/store/store";

// Fetcher function for SWR
const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ensure errors are thrown for SWR to handle
  }
};

const useHotelDetails = (id: string | undefined) => {
  const searchingData = useAppSelector(state => state.searchingSlice);
  const startDate = new Date(searchingData.dates[0].startDate);
  const endDate = new Date(searchingData.dates[0].endDate);

  // Prepare query parameters
  const queryParams = new URLSearchParams({
    id: id || '',
    destination: searchingData.destination || '',
    adult: searchingData.options.adult.toString(),
    children: searchingData.options.children.toString(),
    room: searchingData.options.room.toString(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }).toString();

  const { data, error, mutate } = useSWR(
    `${USER_API}/hotelDetails?${queryParams}`,
    fetcher
  );

  // Function to reload hotel details
  const reloadHotelDetails = async () => {
    try {
      await mutate();
    } catch (error) {
      console.error("Error reloading hotel details:", error);
    }
  };

  return {
    hotel: data?.data, // Access data from SWR response
    loading: !error && !data,
    error,
    reloadHotelDetails,
  };
};

export default useHotelDetails;
