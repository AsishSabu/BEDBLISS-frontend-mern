import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./user/UserRouter";
import OwnerRouter from "./owner/OwnerRouter";
import "../router.css";
import AdminRouter from "./admin/AdminRouter";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserRouter />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter/>} />
      <Route path="/owner/*" element={<OwnerRouter />} />
    </Routes>
  );
};

export default MainRouter;
