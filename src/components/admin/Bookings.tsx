import React from "react";
// import useUsers from "../../hooks/admin/useUsers";
import UserData from "./UserData";
import { Table } from "flowbite-react";

const Bookings: React.FC = () => {
//   const { users, loadingBookings, userError } = useBookings();

//   if (loadingBookings) return <div>Loading...</div>;
//   if (userError) return <div>Error loading users.</div>;

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
            return <UserData {...user} type="user" key={user._id} />;
          })} */}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Bookings;
