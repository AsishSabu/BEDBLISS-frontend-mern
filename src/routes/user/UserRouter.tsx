import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Home from "../../pages/Home";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import React from "react";
import { PublicRoutes } from "../publicRoutes";
import { ProtectedUserRoute } from "../protectedRoutes";
import VerifyOtp from "../../components/user/VerifyOtp";
const UserRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user public routes*/}

      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
      </Route>
      {/*user private routes*/}

      <Route path="" element={<ProtectedUserRoute />}></Route>
    </Routes>
  );
};

export default UserRouter;
