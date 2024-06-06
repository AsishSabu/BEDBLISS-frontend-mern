import { FC, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store/store"
import axios from "axios"
import { USER_API } from "../constants"
import { clearUser } from "../redux/slices/userSlice"

export const ProtectedUserRoute: FC = () => {
  const { isAuthenticated, role, id } = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [blocked, setBlocked] = useState(false)
  axios
    .get(USER_API + "/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(data => {
      setBlocked(data.data.user.isBlocked)
    })
  console.log(blocked, "...............................")
  if (blocked) {
    dispatch(clearUser())
    return <Navigate to={"/auth/login"} replace />
  }

  return isAuthenticated && role == "user" ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} replace />
  )
}
export const ProtectedAllUserRoute: FC = () => {
  const { isAuthenticated, role, id } = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [blocked, setBlocked] = useState(false)
  axios
    .get(USER_API + "/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(data => {
      setBlocked(data.data.user.isBlocked)
    })
  console.log(blocked, "...............................")
  if (blocked) {
    dispatch(clearUser())
    return <Navigate to={"/auth/login"} replace />
  }

  return role !== "owner" ? <Outlet /> : <Navigate to={"/owner"} replace />
}
export const ProtectedOwnerRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [blocked, setBlocked] = useState(false)
  axios
    .get(USER_API + "/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(data => {
      setBlocked(data.data.user.isBlocked)
    })
  console.log(blocked, "...............................")
  if (blocked) {
    dispatch(clearUser())
    return <Navigate to={"/auth/login"} replace />
  }

  return isAuthenticated && role == "owner" ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} replace />
  )
}
export const ProtectedAdminRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector(state => state.userSlice)
  return isAuthenticated && role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/admin/login"} replace />
  )
}
