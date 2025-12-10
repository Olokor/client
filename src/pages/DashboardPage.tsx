import React, { useState } from "react";
import DashboardContent from "../component/Dashboard/DashboardContent";
import TopNavbar from "../component/navbar/TopNavbar";
import SideNavbar from "../component/navbar/SideNavbar";
import { User } from "../types";

export default function DashboardPage() {
  const [user, setUser] = useState<User>({
    name: "John Doe",
    school: "Greenfield Academy",
    avatar: "/default-avatar.png",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <TopNavbar user={user} onLogout={handleLogout} />
        <DashboardContent />
      </div>
    </div>
  );
}