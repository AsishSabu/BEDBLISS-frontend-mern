import React from 'react';

const Users= ({ }) => {
  return (
<div className='ml-60 mt-16 bg-blue-600 w-screen h-screen  '>
<table className="w-screen bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">User ID</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Profile Pic</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {/* {users.map(user => ( */}
          <tr >
            <td className="px-6 py-4 whitespace-no-wrap">95437259843</td>
            <td className="px-6 py-4 whitespace-no-wrap">asish</td>
            <td className="px-6 py-4 whitespace-no-wrap">ikhdfksjh2@fds</td>
            <td className="px-6 py-4 whitespace-no-wrap">blioc</td>
            <td className="px-6 py-4 whitespace-no-wrap"><img src="" alt="user profile" className="w-8 h-8 rounded-full" /></td>
          </tr>
        {/* ))} */}
      </tbody>
    </table>
    </div>
    
  );
};

export default Users;
