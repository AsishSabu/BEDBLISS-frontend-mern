import React, { useState, useEffect } from "react"
import { Table } from "flowbite-react"
import useHotels from "../../hooks/admin/useHotels"
import Hoteldata from "../../components/admin/Hoteldata"

const Hotels: React.FC = () => {
  const { hotels, loading } = useHotels()
  const [selectedOwner, setSelectedOwner] = useState<string>("")
  const [owners, setOwners] = useState<any>([])

  useEffect(() => {
    const uniqueOwners = Array.from(
      new Set(hotels.map(hotel => hotel.ownerId._id))
    ).map(id => {
      const owner = hotels.find(hotel => hotel.ownerId._id === id)?.ownerId
      return { _id: owner?._id || "", name: owner?.name || "" }
    })
    setOwners(uniqueOwners)
  }, [hotels])

  const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOwner(event.target.value)
  }

  const filteredHotels = selectedOwner
    ? hotels.filter((hotel: any) => hotel.ownerId._id === selectedOwner)
    : hotels

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <select
          title="select"
          value={selectedOwner}
          onChange={handleOwnerChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Owners</option>
          {owners.map((owner: any) => (
            <option key={owner._id} value={owner._id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Owner</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Details</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredHotels.map((hotel: any) => (
            <Hoteldata {...hotel} key={hotel._id} type="hotel" />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Hotels
