import { Routes, Route } from "react-router-dom";
import { FC, lazy } from "react";
import { ProtectedOwnerRoute } from "../protectedRoutes";
import AddHotel from "../../pages/owner/AddHotel";
import OwnerProfile from "../../components/owner/OwnerProfile";
import HotelList from "../../pages/owner/HotelList";
const Home = lazy(() => import("../../pages/owner/Home"));
const Profile = lazy(() => import("../../pages/owner/OwnerProfile"));

const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user private routes*/}

      <Route path="" element={<ProtectedOwnerRoute />}>
        <Route path="/addHotel" element={<AddHotel />} />
        <Route path="/hotels" element={<HotelList/>} />
      </Route>
      <Route path="/profile" element={<Profile />}>
        <Route index element={<OwnerProfile />} />
      </Route>
    </Routes>
  );
};

export default OwnerRouter;
