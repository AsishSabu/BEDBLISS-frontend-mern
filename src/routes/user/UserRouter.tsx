import { FC, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { ProtectedAllUserRoute, ProtectedUserRoute } from "../protectedRoutes"
import Layout from "../../pages/Layout"
import CheckoutPage from "../../components/user/CheckoutPage"
import PaymentCompleted from "../../pages/user/PaymentCompleted"
import BookingHistoryList from "../../pages/user/BookingHistory"
import BookingDetails from "../../pages/user/BookingDetails"
import Wallet from "../../pages/user/Wallet"

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
        <Route path="" element={<ProtectedAllUserRoute />}>
          <Route index element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        </Route>

        {/*user private routes*/}

        <Route path="" element={<ProtectedUserRoute />}>
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/payment_status/:id" element={<PaymentCompleted/>}/>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<UserProfile />} />
            <Route path="/profile/Mybookings" element={<BookingHistoryList />} />
            <Route path="/profile/bookingDetails/:id" element={<BookingDetails />} />
            <Route path="/profile/MyWallet" element={<Wallet />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
