import useSWR from 'swr';
import axios from 'axios';
import { ADMIN_API } from '../../constants';

// Fetcher function using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useDashboard = () => {
  // Use SWR to fetch data
  const { data, error } = useSWR(`${ADMIN_API}/counts`, fetcher);
  const { data:booking, error:bookingErr } = useSWR(`${ADMIN_API}/bookings`, fetcher);
 
  

  const userCount = data?.userCount || "0";
  const ownerCount = data?.ownerCount || "0";
  const hotelCount = data?.hotelCount || "0";
  const bookingCount = booking?.result.length|| "0";

  const loading = !data && !error;

  return {
    userCount,
    ownerCount,
    hotelCount,
    bookingCount,
    loading,
    error
  };
};

export default useDashboard;
