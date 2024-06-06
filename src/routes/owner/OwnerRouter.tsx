import { Routes, Route } from "react-router-dom"
import { FC, lazy } from "react"
import { ProtectedOwnerRoute } from "../protectedRoutes"
import Layout from "../../pages/Layout"
const AddHotel = lazy(() => import("../../pages/owner/AddHotel"))
const OwnerProfile = lazy(() => import("../../pages/owner/Home"))
const HotelList = lazy(() => import("../../pages/owner/HotelList"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"))
const HotelDetails = lazy(() => import("../../pages/owner/HotelDetails"))
const Home = lazy(() => import("../../pages/owner/Home"))
const Profile = lazy(() => import("../../pages/owner/OwnerProfile"))

const OwnerRouter: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        {/*user private routes*/}

        <Route path="" element={<ProtectedOwnerRoute />}>
          <Route index element={<Home />} />
          <Route path="/addHotel" element={<AddHotel />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotelDetails/:id" element={<HotelDetails />} />
          <Route path="/editHotel/:id" element={<HotelDetails />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default OwnerRouter
