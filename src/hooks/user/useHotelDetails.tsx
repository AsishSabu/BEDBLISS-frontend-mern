import useSWR from "swr";
import axios from "axios";
import { USER_API } from "../../constants";
import { useAppSelector } from "../../redux/store/store";

// Fetcher function for SWR with improved error handling
const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    // Log error details for debugging
    if (axios.isAxiosError(error)) {
      // Axios error
      throw new Error(`Error fetching data: ${error.response?.status} ${error.response?.statusText}`);
    } else {
      // Non-Axios error
      throw new Error(`Unexpected error: ${error.message}`);
    }
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

  // Function to reload hotel details with error handling
  const reloadHotelDetails = async () => {
    try {
      await mutate();
    } catch (error:any) {
      // Handle reloading error
      if (axios.isAxiosError(error)) {
        // Axios error
        console.error(`Error reloading hotel details: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        // Non-Axios error
        console.error(`Unexpected error reloading hotel details: ${error.message}`);
      }
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
