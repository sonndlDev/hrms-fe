import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

interface ProtectedLayoutProps {
  allowedRoles: string[];
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ allowedRoles }) => {
  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  console.log("🚀 ~ user:", user);

  // Redirect to sign-in if no user is logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect to the 403 page if the user's role is not allowed
  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // Render the children routes if access is granted
  return <Outlet />;
};

export default ProtectedLayout;
