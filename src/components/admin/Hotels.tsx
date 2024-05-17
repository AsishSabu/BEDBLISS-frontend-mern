import React from 'react'
import { Table } from "flowbite-react";


const Hotels:React.FC = () => {
  return (
    <div className="overflow-x-auto">
    <Table>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {/* {users.map((user) => {
          return <UserData {...user} key={user._id} />;
        })} */}
      </Table.Body>
    </Table>
  </div>
  )
}

export default Hotels

