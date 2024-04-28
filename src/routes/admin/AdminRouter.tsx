import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedUserRoute } from "../protectedRoutes";
import LoginForm from "../../pages/admin/Login";

const AdminRouter: FC = () => {
  return (
    <Routes>

      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<LoginForm />} />
       
      </Route>
      {/*user private routes*/}

      <Route path="" element={<ProtectedUserRoute />}></Route>
    </Routes>
  );
};

export default AdminRouter;
