import React from "react";
import useUsers from "../../hooks/useUsers";
import UserData from "./UserData";

const Users: React.FC = () => {
  const { users } = useUsers();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
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

