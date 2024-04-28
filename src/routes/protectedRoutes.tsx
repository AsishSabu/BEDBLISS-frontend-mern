import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../redux/store/store"

export const ProtectedUserRoute:FC=()=>{
    const {isAuthenticated,role}=useAppSelector((state)=>state.userSlice)
    return isAuthenticated && role=="user"?(<Outlet/>):(<Navigate to={"/user/login"} replace/>)
}
export const ProtectedOwnerRoute:FC=()=>{
    const {isAuthenticated,role}=useAppSelector((state)=>state.userSlice)
    return isAuthenticated && role=="owner"?(<Outlet/>):(<Navigate to={"/owner/login"} replace/>)
}
export const ProtectedAdminRoute:FC=()=>{
    const {isAuthenticated,role}=useAppSelector((state)=>state.userSlice)
    return isAuthenticated && role=="admin"?(<Outlet/>):(<Navigate to={"/admin/login"} replace/>)
}