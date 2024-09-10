import React from "react";
// import ProfileForm from '../components/ProfileForm';
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

const ProfilePage: React.FC = () => {
  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Profile Page</h1>
      {/* <ProfileForm /> */}
    </div>
  );
};

export default ProfilePage;
