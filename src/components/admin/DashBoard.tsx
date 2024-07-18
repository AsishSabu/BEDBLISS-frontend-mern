import Card from "./Card"
import useDashboard from "../../hooks/admin/useDashboard"
import { hotelImage, userImg, bookingImg } from "../../assets/images"
import AreaChartComponent from "./AreaChart"
import RevenueChart from "./RevenueChart"

const DashBoard = () => {
  const { userCount,totalRevenue, ownerCount, hotelCount, bookingCount, graphData } =
    useDashboard()
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <Card title="Total Users" total={userCount}>
          <img src={userImg} alt="user" />
        </Card>
        <Card title="Total Owners" total={ownerCount}>
          <img src={userImg} alt="user" />
        </Card>
        <Card title="Total Hotels" total={hotelCount}>
          <img src={hotelImage} alt="user" className="h-11" />
        </Card>
        <Card title="Total Bookings" total={bookingCount}>
          <img src={bookingImg} alt="user" className="h-11" />
        </Card>
        <Card title="Total Revenue" total={totalRevenue}>
          <img src={bookingImg} alt="user" className="h-11" />
        </Card>

      </div>
      <div className="grid grid-flow-col w-full mt-10 gap-2">
        <div className=" bg-varGray border shadow-md ">
          {" "}
          <AreaChartComponent data={graphData} />
        </div>
        <div className="bg-varGray border shadow-md ">
          {" "}
          <RevenueChart />
        </div>
      </div>
    </>
  )
}

export default DashBoard
