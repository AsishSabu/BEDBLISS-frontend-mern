import useSWR from 'swr';
import axios from 'axios';
import { ADMIN_API } from '../../constants';
import { UserInterface } from '../../types/userInterface';

// Fetcher function using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useUsers = () => {
  // Use SWR to fetch data for users and owners
  const { data: userData, error: userError } = useSWR(`${ADMIN_API}/users`, fetcher);
  const { data: ownerData, error: ownerError } = useSWR(`${ADMIN_API}/owners`, fetcher);

  // Extract the users and owners array from the data
  const users: UserInterface[] = userData?.users || [];
  const owners: UserInterface[] = ownerData?.users || [];

  // Determine loading states
  const loadingUsers = !userData && !userError;
  const loadingOwners = !ownerData && !ownerError;

  return {
    users,
    loadingUsers,
    userError,
    owners,
    loadingOwners,
    ownerError,
  };
};

export default useUsers;
