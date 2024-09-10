import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SettingsPage from "../pages-backup/SettingsPage";
import ForbiddenPage from "../pages-backup/ForbiddenPage";
import ProtectedLayout from "../components/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout";
import PageTitle from "../components/PageTitle";
import ECommerce from "../pages/Dashboard/ECommerce";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import MeetingsCpn from "../pages/Meeting";
import RoomCpn from "../pages/Meeting/Room";
import VideoCallRoom from "../pages/Meeting/components/VideoCallRoom";

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  console.log("🚀 ~ useShallow ~ user:", user);

  if (!user) {
    // If no user is logged in, redirect to login
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <AuthRoute>
            <DefaultLayout />
          </AuthRoute>
        }
      >
        {/* Nested routes inside DefaultLayout */}
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route
          path="/overview"
          element={
            <>
              <PageTitle title="Overview | SonNDL.Dev" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/meeting"
          element={
            <>
              <PageTitle title="Meetings | SonNDL.Dev" />
              <MeetingsCpn />
            </>
          }
        />
        <Route
          path="/meeting/room"
          element={
            <>
              <PageTitle title="Meetings | SonNDL.Dev" />
              <RoomCpn />
            </>
          }
        />
        <Route
          path="/video-call-room/:roomID"
          element={<VideoCallRoom roomID={""} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Forbidden page */}
      <Route path="/403" element={<ForbiddenPage />} />

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  );
};

export default AppRoutes;
