import useSWR from 'swr';
import axios from 'axios';
import { ADMIN_API } from '../../constants';
import { HotelInterface } from '../../types/hotelInterface';

// Fetcher function using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useHotels = () => {
  // Use SWR to fetch data
  const { data, error } = useSWR(`${ADMIN_API}/hotels`, fetcher);

  // Extract the hotels array from the data
  const hotels: HotelInterface[] = data?.Hotels || [];
  const loading = !data && !error;

  return {
    hotels,
    loading,
    error
  };
};

export default useHotels;
