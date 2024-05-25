
import userImage from "/src/assets/images/user.svg"
import hotel from "/src/assets/images/hotel.svg"
import booking from "/src/assets/images/appointment.svg"
import Card from "./Card"
import useDashboard from "../../hooks/admin/useDashboard"

const DashBoard = () => {
  const {userCount,ownerCount,hotelCount,bookingCount}=useDashboard()
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Card title="Total Users" total={userCount} >
        <img src={userImage} alt="user" />
      </Card>
      <Card title="Total Owners" total={ownerCount} >
        <img src={userImage} alt="user" />
      </Card>
      <Card title="Total Hotels" total={hotelCount} >
        <img src={hotel} alt="user" className="h-11"/>
      </Card>
      <Card title="Total Bookings" total={bookingCount}  >
        <img src={booking} alt="user" className="h-11"/>
      </Card>
    </div>
  )
}

export default DashBoard
