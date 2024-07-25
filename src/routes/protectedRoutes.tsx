import { FC, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import axios from "axios";
import { USER_API } from "../constants";
import { clearUser } from "../redux/slices/userSlice";
import showToast from "../utils/toast";

const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${USER_API}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data.user.isBlocked;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const ProtectedUserRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then((isBlocked) => {
        setBlocked(isBlocked);
      })
      .catch((error) => {
        console.error("Error checking user block status:", error);
        setBlocked(true); // Assume blocked on error for safety
      });
  }, []);

  if (blocked) {
    dispatch(clearUser());
    showToast("Your account is blocked", "error");
    return <Navigate to={"/auth/login"} replace />;
  }

  return isAuthenticated && role === "user" ? <Outlet /> : <Navigate to={"/auth/login"} replace />;
};

export const ProtectedAllUserRoute: FC = () => {
  const {role } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then((isBlocked) => {
        setBlocked(isBlocked);
      })
      .catch((error) => {
        console.error("Error checking user block status:", error);
        setBlocked(true); // Assume blocked on error for safety
      });
  }, []);

  if (blocked) {
    dispatch(clearUser());
    return <Navigate to={"/auth/login"} replace />;
  }

  return role !== "owner" ? <Outlet /> : <Navigate to={"/owner"} replace />;
};

export const ProtectedOwnerRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then((isBlocked) => {
        setBlocked(isBlocked);
      })
      .catch((error) => {
        console.error("Error checking user block status:", error);
        setBlocked(true); // Assume blocked on error for safety
      });
  }, []);

  if (blocked) {
    dispatch(clearUser());
    return <Navigate to={"/auth/login"} replace />;
  }

  return isAuthenticated && role === "owner" ? <Outlet /> : <Navigate to={"/auth/login"} replace />;
};

export const ProtectedAdminRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);

  return isAuthenticated && role === "admin" ? <Outlet /> : <Navigate to={"/admin/login"} replace />;
};
