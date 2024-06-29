import { Routes, Route } from "react-router-dom";
import { FC, lazy } from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedAdminRoute } from "../protectedRoutes";
import NotFoundPage from "../../pages/NotFoundPage";
import HotelDetails from "../../components/admin/HotelDetails";
import Owners from "../../pages/admin/Owners";
const Users = lazy(() => import("../../pages/admin/Users"))
const Hotels= lazy(() => import("../../pages/admin/Hotels"))
const LoginForm = lazy(() => import("../../pages/admin/Login"));
const Layout = lazy(() => import("../../pages/admin/Layout"));
const DashBoard = lazy(() => import("../../components/admin/DashBoard"));

const AdminRouter: FC = () => {
  return (
    <Routes>
      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>
      {/*user private routes*/}

      <Route path="" element={<ProtectedAdminRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/owners" element={<Owners/>} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRouter;
