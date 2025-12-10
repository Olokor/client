import { useState } from "react";
import { Bell, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { User as UserType } from "../../types";

interface TopNavbarProps {
  user?: UserType;
  onLogout?: () => void;
}

const TopNavbar = ({ user, onLogout }: TopNavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: Logo / Brand */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo192.png"
          alt="School Logo"
          className="h-8 w-8 rounded-full"
        />
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          {user?.school || "School Admin"}
        </h1>
      </div>

      {/* Center: Optional Search Bar */}
      <div className="flex-1 px-6 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        />
      </div>

      {/* Right: Notifications + User Menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
          >
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {user?.name || "Admin"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" /> Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </button>
              <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
