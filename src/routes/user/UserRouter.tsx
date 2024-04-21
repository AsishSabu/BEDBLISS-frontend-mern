import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default UserRouter;
