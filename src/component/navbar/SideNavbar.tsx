import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  FileText,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  User,
} from "lucide-react";

interface SideNavbarProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  onClick?: () => void;
}

interface SidebarSubItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function SideNavbar({ isSidebarOpen = false, setIsSidebarOpen }: SideNavbarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  const toggleCollapse = () => {
    // On mobile, toggle the overlay sidebar
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // On desktop, toggle collapse
      setIsCollapsed(!isCollapsed);
      // Close dropdown when collapsing
      if (!isCollapsed) {
        setIsUsersDropdownOpen(false);
      }
    }
  };

  const handleUsersDropdownToggle = () => {
    if (isCollapsed) return; // Don't open dropdown when collapsed
    setIsUsersDropdownOpen(!isUsersDropdownOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors md:hidden"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-64"} 
          bg-gradient-to-b from-blue-700 to-purple-800 text-white flex flex-col transition-all duration-300 flex-shrink-0
          
          /* Mobile styles */
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-40 translate-x-0' : 'fixed inset-y-0 left-0 z-40 -translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 flex-shrink-0">
          {!isCollapsed && (
            <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
          )}
          {/* Desktop collapse button */}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:block"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 space-y-2 px-2 overflow-y-auto">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          />
          
          {/* Manage Users Dropdown */}
          <div>
            <button
              onClick={handleUsersDropdownToggle}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/10 ${
                location.pathname.includes('/admin/teachers') || 
                location.pathname.includes('/admin/students') 
                  ? 'bg-white/20' 
                  : ''
              }`}
            >
              <Users className="w-5 h-5" />
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">Manage Users</span>
                  {isUsersDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
            
            {/* Dropdown Items */}
            {!isCollapsed && isUsersDropdownOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <SidebarSubItem
                  to="/admin/teachers"
                  icon={<GraduationCap className="w-4 h-4" />}
                  label="Teachers"
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                />
                <SidebarSubItem
                  to="/admin/students"
                  icon={<User className="w-4 h-4" />}
                  label="All Students"
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                />
                <SidebarSubItem
                  to="/admin/students/register"
                  icon={<UserPlus className="w-4 h-4" />}
                  label="Register Student"
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                />
              </div>
            )}
          </div>

          {/* <SidebarItem
            to="/admin/create-user"
            icon={<UserPlus className="w-5 h-5" />}
            label="Create Teacher/Student"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          /> */}
          <SidebarItem
            to="/admin/classes"
            icon={<BookOpen className="w-5 h-5" />}
            label="Classes & Subjects"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          />
          <SidebarItem
            to="/admin/schemes"
            icon={<ClipboardList className="w-5 h-5" />}
            label="Upload Schemes"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          />
          <SidebarItem
            to="/admin/reports"
            icon={<FileText className="w-5 h-5" />}
            label="Reports"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <SidebarItem
            to="/admin/settings"
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            collapsed={isCollapsed}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

const SidebarItem = ({ to, icon, label, collapsed, onClick }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? "bg-white/20" : "hover:bg-white/10"
        }`
      }
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

const SidebarSubItem = ({ to, icon, label, onClick }: SidebarSubItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
          isActive ? "bg-white/20" : "hover:bg-white/10"
        }`
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};
