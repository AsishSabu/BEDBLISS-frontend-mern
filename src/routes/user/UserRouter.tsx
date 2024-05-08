import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedUserRoute } from "../protectedRoutes";
import Loader from "../../components/Loader";
const UserProfile = lazy(() => import("../../components/user/UserProfile"));
const Home = lazy(() => import("../../pages/Home"));
const Profile = lazy(() => import("../../pages/user/Profile"));

const UserRouter: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />

        {/*user private routes*/}

        <Route path="" element={<ProtectedUserRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default UserRouter;
