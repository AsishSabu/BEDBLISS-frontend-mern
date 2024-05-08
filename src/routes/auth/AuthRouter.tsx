import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../publicRoutes";
const ForgotPassword = lazy(() => import("../../pages/auth/ForgotPassword"));
const Login = lazy(() => import("../../pages/auth/Login"));
const Register = lazy(() => import("../../pages/auth/ResetPassword"));
const ResetPassword = lazy(() => import("../../pages/auth/Register"));
const VerifyOtp = lazy(() => import("../../pages/auth/VerifyOtp"));

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
