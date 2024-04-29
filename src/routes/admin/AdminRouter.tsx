import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedAdminRoute} from "../protectedRoutes";
import LoginForm from "../../pages/admin/Login";
import Layout from "../../pages/admin/Layout";
import DashBoard from "../../components/admin/DashBoard";

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
          <Route index element={<DashBoard/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
