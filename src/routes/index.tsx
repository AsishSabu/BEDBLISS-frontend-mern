import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserRouter from "./user/UserRouter";
import OwnerRouter from "./owner/OwnerRouter";
import AdminRouter from "./admin/AdminRouter";
import AuthRouter from "./auth/AuthRouter";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFoundPage";

const MainRouter:React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<UserRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/user/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/owner/*" element={<OwnerRouter />} />       
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
