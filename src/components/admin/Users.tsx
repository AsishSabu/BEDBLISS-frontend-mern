import React from "react";
import useUsers from "../../hooks/admin/useUsers";
import UserData from "./UserData";
import { Table } from "flowbite-react";

const Users: React.FC = () => {
  const { users } = useUsers();

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
          {users.map((user) => {
            return <UserData {...user} key={user._id} />;
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Users;
