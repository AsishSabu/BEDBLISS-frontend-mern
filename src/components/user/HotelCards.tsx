import React from 'react'
import HotelData from './HotelData'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducer/reducer'

const HotelCards: React.FC = () => {
  const searchResults = useSelector((state: RootState) => state.destinationSlice.search)

  return (
    <div className="py-10 px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchResults.length > 0 ? (
        searchResults.map((hotel) => <HotelData key={hotel._id} {...hotel} />)
      ) : (
        <p>No hotels available</p>
      )}
    </div>
  )
}

export default HotelCards
