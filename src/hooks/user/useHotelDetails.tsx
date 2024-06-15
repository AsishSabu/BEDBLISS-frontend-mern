import useSWR from 'swr';
import axios from 'axios';
import { USER_API } from '../../constants';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useHotelDetails = (id: string | undefined) => {
  const { data, error } = useSWR(id ? `${USER_API}/hotelDetails/${id}` : null, fetcher);

  return {
    hotel: data?.Hotel,
    loading: !error && !data,
    error: error
  };
};

export default useHotelDetails;
