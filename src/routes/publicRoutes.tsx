import { FC } from "react";
import { useAppSelector } from "../redux/store/store";
import { Navigate, Outlet } from "react-router-dom";


export const PublicRoutes:FC=()=>{

    const {isAuthenticated,role}=useAppSelector((state)=>state.userSlice)
    if(role==="user"){
        return isAuthenticated?(<Navigate to={"/user"} replace/> ):(<Outlet/>)
    }else if(role==="owner"){
        return isAuthenticated?(<Navigate to={"/owner"} replace/>):(<Outlet/>)
    }else if(role==="admin"){
        return isAuthenticated?(<Navigate to={"/admin"} replace/>):(<Outlet/>)
    }else{
        return <Outlet/>
    }

}