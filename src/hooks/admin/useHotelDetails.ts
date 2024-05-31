import { useEffect, useState } from "react"
import axios from "axios"
import {  ADMIN_API, USER_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"
import { TbArrowAutofitRight } from "react-icons/tb"
import showToast from "../../utils/toast"

const useHotelDetails = (id:string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const { data } = await axios.get(`${USER_API}/hotelDetails/${id}`);        
        setHotel(data.Hotel);
      } catch (error) {
        setError("Failed to fetch hotel details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  });

  const verifyHotel=()=>{

    axios
      .patch(ADMIN_API +`/verify_hotel/${id}`)
      .then((response)=>{
        console.log(response);
        
        showToast(response.data.message,"success")
      })
      .catch(err => console.log(err));
    
    
  }
  

  return { hotel, loading, error ,verifyHotel };
};



export default useHotelDetails 
