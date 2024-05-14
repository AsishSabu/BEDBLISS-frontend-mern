import React from "react";
import {useOwners} from "../../hooks/useUsers";
import UserData from "./UserData";

const Users = () => {
  const { users } = useOwners();

  return (
    <div className="w-full relative ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg custom-vh">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-4 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-8 py-3">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white w-screen">
            {users.map((user) => {
              return <UserData {...user} key={user._id} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
