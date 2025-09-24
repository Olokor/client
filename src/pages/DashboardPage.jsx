// import React from 'react'
// import SideNavbar from '../component/navbar/SideNavbar'
// import TopNavbar from '../component/navbar/TopNavbar'

// export default function DashboardPage(){
//   return (
//     <div>
//       <TopNavbar/>
//       <SideNavbar />
//       <h1>dashboard</h1>
//     </div>
//   )
// }

// Dashboard.jsx
import React, { useState } from "react";
import DashboardContent from "../component/Dashboard/DashboardContent";
import TopNavbar from "../component/navbar/TopNavbar";
import SideNavbar from "../component/navbar/SideNavbar";


export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    school: "Greenfield Academy",
    avatar: "/default-avatar.png",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />

      <div className="flex-1 flex flex-col">
        <TopNavbar user={user} onLogout={handleLogout} />
        <DashboardContent />
      </div>
    </div>
  );
}

