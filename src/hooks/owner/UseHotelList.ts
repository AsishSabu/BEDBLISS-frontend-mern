import useSWR from "swr";
import { OWNER_API } from "../../constants";
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return res.json();
};

const useHotelList = () => {
  const { data: hotels, error } = useSWR(`${OWNER_API}/myHotels`, fetcher);

  return {
    hotels: hotels?.Hotels ?? [],
    error: error ? "Failed to fetch hotels" : null,
    isLoading: !hotels && !error,
  };
};

export default useHotelList;
