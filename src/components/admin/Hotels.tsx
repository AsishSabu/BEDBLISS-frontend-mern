import React from 'react'
import { Table } from "flowbite-react";
import useHotels from '../../hooks/admin/useHotels';
import UserData from './UserData';
// import { type } from './../../utils/toast';


const Hotels:React.FC = () => {
  const {hotels}=useHotels()
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
        {hotels.map((hotel) => {
          return <UserData {...hotel}  key={hotel._id} type="hotel" />;
        })}
      </Table.Body>
    </Table>
  </div>
  )
}

export default Hotels

