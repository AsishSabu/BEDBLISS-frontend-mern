import useSWR from 'swr';
import axios from 'axios';
import { ADMIN_API, USER_API } from '../../constants';
import { HotelInterface } from '../../types/hotelInterface';
import showToast from '../../utils/toast';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useHotelDetails = (id: string) => {
  const { data, error, mutate } = useSWR(`${USER_API}/hotelDetails/${id}`, fetcher);

  const hotel: HotelInterface | null = data?.Hotel || null;
  const loading: boolean = !error && !data;

 
   const verifyHotel = async () => {
    try {
      const response = await axios.patch(`${ADMIN_API}/verify_hotel/${id}`);
      showToast(response.data.message, 'success');
      mutate(); // Revalidate the data after verifying the hotel
    } catch (err) {
      console.error(err);
    }
  };

  const RejectHotel = async (reason:string) => {
    try {
      const response = await axios.patch(`${ADMIN_API}/reject_hotel/${id}`,{reason});
      showToast(response.data.message, 'success');
      mutate(); // Revalidate the data after verifying the hotel
    } catch (err) {
      console.error(err);
    }
  };


  return { hotel, loading, error, verifyHotel,RejectHotel };
};

export default useHotelDetails;
