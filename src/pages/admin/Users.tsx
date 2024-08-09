import React, { useState } from "react"
import useUsers from "../../hooks/admin/useUsers"
import UserData from "../../components/admin/UserData"
import { Table } from "flowbite-react"
import Pagination from "../../components/Pagination"

const Users: React.FC = () => {
  const { users, loadingUsers, userError } = useUsers()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dataPerPage = 5
  const lastPostIndex = currentPage * dataPerPage
  const firstPostIndex = lastPostIndex - dataPerPage
  const currentData = users.slice(firstPostIndex, lastPostIndex)

  if (loadingUsers) return <div>Loading...</div>
  if (userError) return <div>Error loading users.</div>

  return (
    <div className="overflow-x-auto h-screen">
      <div className="h-96">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentData.map(user => {
              return <UserData {...user} type="user" key={user._id} />
            })}
          </Table.Body>
        </Table>
      </div>{" "}
      <div className="mt-4 flex justify-center">
        {users.length ? (
          <Pagination
            currentPage={currentPage}
            totalData={users.length}
            dataPerPage={dataPerPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Users
