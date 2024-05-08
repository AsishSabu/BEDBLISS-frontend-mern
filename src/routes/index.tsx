import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./user/UserRouter";
import OwnerRouter from "./owner/OwnerRouter";
import "../router.css";
import AdminRouter from "./admin/AdminRouter";
import AuthRouter from "./auth/AuthRouter";
import Loader from "../components/Loader";

const MainRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<UserRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/user/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/owner/*" element={<OwnerRouter />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
