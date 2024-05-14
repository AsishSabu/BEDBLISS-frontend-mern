import { Routes, Route } from "react-router-dom";
import { FC,lazy } from "react";
import { ProtectedOwnerRoute} from "../protectedRoutes";
import AddHotel from "../../pages/owner/AddHotel";
const  Home=lazy(()=>import("../../pages/owner/Home"))

const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user private routes*/}

      <Route path="" element={<ProtectedOwnerRoute />}>
      <Route path="/addHotel" element={<AddHotel />} />
      </Route>
    </Routes>
  );
};

export default OwnerRouter;
