import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedUserRoute } from "../protectedRoutes";
import Home from "../../pages/owner/Home";
import Login from "../../pages/owner/Login";
import Register from "../../pages/owner/Register";
import Otppage from "../../pages/owner/Otppage";
const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOtp" element={<Otppage />} />
      </Route>
      {/*user private routes*/}

      <Route path="" element={<ProtectedUserRoute />}></Route>
    </Routes>
  );
};

export default OwnerRouter;
