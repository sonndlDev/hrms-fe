import React from "react";

const ForbiddenPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default ForbiddenPage;
