import { useEffect, useState } from 'react';
import axios from 'axios';
import { HotelInterface } from '../types/hotelInterface';
import { USER_API } from '../constants';

const useHotelDetails = (id: string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${USER_API}/hotels/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setHotel(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  return { hotel, loading, error };
};

export default useHotelDetails;
