import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedUserRoute } from "../protectedRoutes";
import HotelDetails from "../../pages/user/HotelDetails";
const UserProfile = lazy(() => import("../../components/user/UserProfile"));
const Home = lazy(() => import("../../pages/Home"));
const Profile = lazy(() => import("../../pages/user/Profile"));

const UserRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/hotelDetails/:id" element={<HotelDetails/>}/>

      {/*user private routes*/}

      <Route path="" element={<ProtectedUserRoute />}>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
