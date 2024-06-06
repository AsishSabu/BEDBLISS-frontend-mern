import useSWR from 'swr';
import axios from 'axios';
import { USER_API } from '../../constants';

const fetcher = url => axios.get(url).then(res => res.data);

const useHotelDetails = (id: string) => {
  const { data, error } = useSWR(`${USER_API}/hotelDetails/${id}`, fetcher);

  return {
    hotel: data ? data.Hotel : null,
    loading: !error && !data,
    error: error ? "Failed to fetch hotel details" : null
  };
};

export default useHotelDetails;
