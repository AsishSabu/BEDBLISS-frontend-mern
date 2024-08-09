import React, { useState } from "react"
import useUsers from "../../hooks/admin/useUsers"
import UserData from "../../components/admin/UserData"
import { Table } from "flowbite-react"
import Pagination from "../../components/Pagination"

const Owners: React.FC = () => {
  const { owners } = useUsers()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dataPerPage = 5
  const lastPostIndex = currentPage * dataPerPage
  const firstPostIndex = lastPostIndex - dataPerPage
  const currentData = owners.slice(firstPostIndex, lastPostIndex)

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
            {currentData.map((user: any) => {
              return <UserData {...user} type="user" key={user._id} />
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        {owners.length ? (
          <Pagination
            currentPage={currentPage}
            totalData={owners.length}
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

export default Owners
