import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Home from "../../pages/Home";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedUserRoute } from "../protectedRoutes";
import VerifyOtp from "../../components/user/VerifyOtp";
import ForgotPassword from "../../pages/user/ForgotPassword";
import ResetPassword from "../../pages/user/ResetPassword";
const UserRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/resetPassword/:id" element={<ResetPassword/>} />
      </Route>
      {/*user private routes*/}

      <Route path="" element={<ProtectedUserRoute />}></Route>
    </Routes>
  );
};

export default UserRouter;
