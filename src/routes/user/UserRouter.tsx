import { FC, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { ProtectedUserRoute } from "../protectedRoutes"
import Layout from "../../pages/Layout"
import CheckoutPage from "../../components/user/CheckoutPage"

const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"))
const HotelDetails = lazy(() => import("../../pages/user/HotelDetails"))
const Hotels = lazy(() => import("../../pages/user/Hotels"))
const UserProfile = lazy(() => import("../../components/user/UserProfile"))
const Home = lazy(() => import("../../pages/user/Home"))
const Profile = lazy(() => import("../../pages/user/Profile"))

const UserRouter: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        {/*user private routes*/}

        <Route path="" element={<ProtectedUserRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
