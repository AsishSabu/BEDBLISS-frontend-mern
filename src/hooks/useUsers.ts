import { useEffect, useState } from "react";
import { UserInterface } from "../types/userInterface";
import axios from "axios";
import { ADMIN_API } from "../constants";

const useUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  useEffect(() => {
    axios
      .get(ADMIN_API + "/users")
      .then(({ data }) => {
        console.log(data,"data");
        
        const {users} = data;
        setUsers(users);
        console.log(users);
        
      })
      .catch((error: any) => console.log(error));
  },[setUsers]);
  return {
    users,
  };
};

export default useUsers;
