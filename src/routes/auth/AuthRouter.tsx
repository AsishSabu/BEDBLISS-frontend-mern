import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import ResetPassword from "../../pages/auth/ResetPassword";
import VerifyOtp from "../../pages/auth/VerifyOtp";
import { PublicRoutes } from "../publicRoutes";

const AuthRouter: FC = () => {
  return (
    <Routes>
      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
