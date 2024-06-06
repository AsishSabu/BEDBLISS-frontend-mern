import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { USER_API } from '../../constants';
import { HotelInterface } from '../../types/hotelInterface';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchValue, setLoading, setError } from '../../redux/slices/destinationSlice';
import { fetcher } from '../../utils/fetcher';



const useUserHotels = () => {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();

  const { data: hotelsData, error } = useSWR(`${USER_API}/hotels`, fetcher);

  const handleSearch = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${USER_API}/searchedHotels`, {
        params: {
          destination,
          checkInDate,
          checkOutDate,
        },
      });
      dispatch(setSearchValue(data.data));
      console.log(data.data);

      navigate('/user/hotels');
    } catch (error) {
      dispatch(setError('Failed to fetch hotels'));
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (error) {
    dispatch(setError('Failed to fetch hotels'));
    console.error(error);
  }

  return {
    hotels: hotelsData ? hotelsData.Hotels : [],
    destination,
    checkInDate,
    checkOutDate,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    handleSearch,
  };
};

export default useUserHotels;
