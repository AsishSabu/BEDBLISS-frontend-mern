import { Routes, Route } from "react-router-dom";
import { FC, lazy } from "react";
import { ProtectedOwnerRoute } from "../protectedRoutes";

const Layout = lazy(() => import("../../pages/Layout"));
const AddRoom = lazy(() => import("../../pages/owner/AddRoom"));
const BookingList = lazy(() => import("../../pages/owner/BookingList"));
const BookingDetails = lazy(() => import("../../pages/owner/BookingDetails"));
// const EditHotelForm = lazy(() => import("../../pages/owner/EditHotel"));
const ChatComponent = lazy(() => import("../../pages/owner/OwnerChat"));
const Layout2 = lazy(() => import("../../pages/Layout2"));
const AddHotel = lazy(() => import("../../pages/owner/AddHotel"));
const OwnerProfile = lazy(() => import("../../pages/owner/Home"));
const HotelList = lazy(() => import("../../pages/owner/HotelList"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const HotelDetails = lazy(() => import("../../pages/owner/HotelDetails"));
const Home = lazy(() => import("../../pages/owner/Home"));
const Profile = lazy(() => import("../../pages/owner/OwnerProfile"));

const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        {/* user private routes */}
        <Route path="*" element={<ProtectedOwnerRoute />}>
          <Route path="*" element={<Layout2 />}>
            <Route index element={<Home />} />
            <Route path="addHotel" element={<AddHotel />} />
            {/* <Route path="editHotel/:id" element={<EditHotelForm />} /> */}
            <Route path="addRooms" element={<AddRoom />} />
            <Route path="hotels" element={<HotelList />} />
            <Route path="hotelDetails/:id" element={<HotelDetails />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="bookingDetails/:id" element={<BookingDetails />} />
          </Route>
          <Route path="chat" element={<ChatComponent />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default OwnerRouter;
