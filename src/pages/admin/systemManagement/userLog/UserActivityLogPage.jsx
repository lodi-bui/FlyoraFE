// pages/UserActivityLogPage.jsx
import React from "react";
import MenuAdmin from "../../../../components/layout/MenuAdmin";
import UserActivityLog from "./UserActivityLog";

const UserActivityLogPage = () => {
  return (
    <div className="flex min-h-screen">
      <MenuAdmin />
      <UserActivityLog />
    </div>
  );
};

export default UserActivityLogPage;
