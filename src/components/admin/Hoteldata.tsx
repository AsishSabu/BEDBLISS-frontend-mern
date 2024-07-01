import { useState } from "react"
import axiosJWT from "../../utils/axiosService"
import { ADMIN_API } from "../../constants"
import { Table } from "flowbite-react"
import { Link } from "react-router-dom"

interface UserDataProps {
  _id: string
  name: string
  isBlocked: boolean
  type: "user" | "hotel"
}

const Hoteldata: React.FC<UserDataProps> = ({ _id, name, isBlocked, type }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    const endpoint = `/block_hotel/${_id}`
    axiosJWT.patch(ADMIN_API + endpoint).catch(err => console.log(err))
  }

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isChecked ? "bg-red-500" : "bg-green-400"
            }`}
          ></div>
          <p>{isChecked ? "Blocked" : "Active"}</p>
        </div>
      </Table.Cell>
      <Table.Cell>
        <label className="flex cursor-pointer select-none items-center ">
          <div className="relative">
            <input
              title="title"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-6 w-10 rounded-full ${
                isChecked ? "bg-red-500" : "bg-green-500"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </Table.Cell>
      <Table.Cell>
        <Link to={`/admin/hotel/${_id}`}>View Details</Link>
      </Table.Cell>
    </Table.Row>
  )
}

export default Hoteldata
