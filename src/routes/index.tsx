import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";

const UserRouter = lazy(() => import("./user/UserRouter"));
const OwnerRouter = lazy(() => import("./owner/OwnerRouter"));
const AdminRouter = lazy(() => import("./admin/AdminRouter"));
const AuthRouter = lazy(() => import("./auth/AuthRouter"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const MainRouter: React.FC = () => {
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
