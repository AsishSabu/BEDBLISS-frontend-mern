import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

 const fetcher = async (url:string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const useFetchData = <T,>(url: string, options?: SWRConfiguration) => {
  const { data, error } = useSWR<T>(url, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};