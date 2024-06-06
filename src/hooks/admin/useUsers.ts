import useSWR from 'swr';
import axios from 'axios';
import { ADMIN_API } from '../../constants';
import { UserInterface } from '../../types/userInterface';

// Fetcher function using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useUsers = () => {
  // Use SWR to fetch data
  const { data, error } = useSWR(`${ADMIN_API}/users`, fetcher);

  // Extract the users array from the data
  const users: UserInterface[] = data?.users || [];
  const loading = !data && !error;

  return {
    users,
    loading,
    error
  };
};

export default useUsers;
