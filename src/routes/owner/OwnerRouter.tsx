import { Routes, Route } from "react-router-dom";
import { FC,lazy } from "react";
import { ProtectedOwnerRoute} from "../protectedRoutes";
const  Home=lazy(()=>import("../../pages/owner/Home"))

const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/*user private routes*/}

      <Route path="" element={<ProtectedOwnerRoute />}></Route>
    </Routes>
  );
};

export default OwnerRouter;
