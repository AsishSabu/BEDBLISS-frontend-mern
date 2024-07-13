import Card from "./Card"
import useDashboard from "../../hooks/admin/useDashboard"
import { hotelImage, userImg ,bookingImg} from "../../assets/images"
import AreaChartComponent from "./AreaChart"


const DashBoard = () => {
  const {userCount,ownerCount,hotelCount,bookingCount,graphData}=useDashboard()
  return (
    <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Card title="Total Users" total={userCount} >
        <img src={userImg} alt="user" />
      </Card>
      <Card title="Total Owners" total={ownerCount} >
        <img src={userImg} alt="user" />
      </Card>
      <Card title="Total Hotels" total={hotelCount} >
        <img src={hotelImage} alt="user" className="h-11"/>
      </Card>
      <Card title="Total Bookings" total={bookingCount}  >
        <img src={bookingImg} alt="user" className="h-11"/>
      </Card>
    </div>
    <div>
      <AreaChartComponent data={graphData}/></div></>

  )
}

export default DashBoard
