import { FC, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { ProtectedAllUserRoute, ProtectedUserRoute } from "../protectedRoutes"
import SavedHotels from "../../pages/user/SavedHotels"
import Notifications from "../../components/Notifications"
import ContactUs from "../../pages/user/ContactUs"

const Layout = lazy(() => import("../../pages/Layout"))
const CheckoutPage = lazy(() => import("../../pages/user/CheckoutPage"))
const PaymentCompleted = lazy(() => import("../../pages/user/PaymentCompleted"))
const BookingHistoryList = lazy(() => import("../../pages/user/BookingHistory"))
const BookingDetails = lazy(() => import("../../pages/user/BookingDetails"))
const Wallet = lazy(() => import("../../pages/user/Wallet"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"))
const HotelDetails = lazy(() => import("../../pages/user/HotelDetails"))
const Hotels = lazy(() => import("../../pages/user/Hotels"))
const UserProfile = lazy(() => import("../../components/UserProfile"))
const Home = lazy(() => import("../../pages/user/Home"))
const Profile = lazy(() => import("../../pages/user/Profile"))

const UserRouter: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<ProtectedAllUserRoute />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotelDetails/:id" element={<HotelDetails />} />
          <Route path="contactUs" element={<ContactUs />} />
        </Route>
        <Route path="" element={<ProtectedUserRoute />}>
          <Route path="saved" element={<SavedHotels />} />
          <Route path="checkout/:id" element={<CheckoutPage />} />
          <Route path="payment_status/:id" element={<PaymentCompleted />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="profile" element={<Profile />}>
            <Route index element={<UserProfile />} />
            <Route
              path="/profile/Mybookings"
              element={<BookingHistoryList />}
            />
            <Route
              path="/profile/bookingDetails/:id"
              element={<BookingDetails />}
            />
            <Route path="/profile/MyWallet" element={<Wallet />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
