import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "../../components/user/UserProfile";
import Home from "../../pages/Home";
import Profile from "../../pages/user/Profile";
import { ProtectedUserRoute } from "../protectedRoutes";
const UserRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

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
