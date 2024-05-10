import { Routes, Route } from "react-router-dom";
import { FC, lazy } from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedAdminRoute } from "../protectedRoutes";
const Users = lazy(() => import("../../components/admin/Users"))
const Owners = lazy(() => import("../../components/admin/Owners"))
const Hotels= lazy(() => import("../../components/admin/Hotels"))
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
          <Route path="/owners" element={<Owners />} />
          <Route path="/hotels" element={<Hotels />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
