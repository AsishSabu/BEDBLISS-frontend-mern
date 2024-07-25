import Card from "./Card";
import useDashboard from "../../hooks/admin/useDashboard";
import { hotelImage, userImg, bookingImg } from "../../assets/images";
import AreaChartComponent from "./AreaChart";
import RevenueChart from "./RevenueChart";

const DashBoard = () => {
  const {
    userCount,
    totalRevenue,
    ownerCount,
    hotelCount,
    bookingCount,
    graphData,
  } = useDashboard();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-7.5">
        <Card title="Total Users" total={userCount}>
          <img src={userImg} alt="user" />
        </Card>
        <Card title="Total Owners" total={ownerCount}>
          <img src={userImg} alt="user" />
        </Card>
        <Card title="Total Hotels" total={hotelCount}>
          <img src={hotelImage} alt="hotel" className="h-11" />
        </Card>
        <Card title="Total Bookings" total={bookingCount}>
          <img src={bookingImg} alt="booking" className="h-11" />
        </Card>
        <Card title="Total Revenue" total={totalRevenue}>
          <img src={bookingImg} alt="revenue" className="h-11" />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2 lg:gap-6">
        <div className="bg-varWhite border shadow-md rounded-lg p-4">
          <AreaChartComponent data={graphData} />
        </div>
        <div className="bg-varWhite border shadow-md rounded-lg p-4">
          <RevenueChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
