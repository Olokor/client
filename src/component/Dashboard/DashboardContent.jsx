import { Users, User, BookOpen, TrendingUp, GraduationCap } from "lucide-react";
import useFetch from "../../manager/UseFetch";
import { SquareCard } from "../Card/SquareCard";
import { RectCard } from "../Card/RectCard";

export default function DashboardContent() {
  const { data: students, loading: studentsLoading } = useFetch("admin/get-all-students");
  const { data: teachers, loading: teachersLoading } = useFetch("admin/get-all-teachers");
  const { data: classes, loading: classesLoading } = useFetch("admin/get-all-class");

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening in your school today.
        </p>
      </div>

      {/* Top Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SquareCard
          title="Total Students"
          value={studentsLoading ? "..." : students?.count || 0}
          icon={<Users className="h-6 w-6" />}
          color="from-blue-500 to-blue-700"
        />
        <SquareCard
          title="Active Teachers"
          value={teachersLoading ? "..." : teachers?.count || 0}
          icon={<User className="h-6 w-6" />}
          color="from-green-500 to-emerald-600"
        />
        <SquareCard
          title="Total Classes"
          value={classesLoading ? "..." : classes?.count || 0}
          icon={<BookOpen className="h-6 w-6" />}
          color="from-pink-500 to-red-600"
        />
        <SquareCard
          title="Academic Performance"
          value="87%"
          icon={<GraduationCap className="h-6 w-6" />}
          color="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RectCard title="Recent Activity">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm text-gray-700">John Doe enrolled in Class 5A</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="p-2 bg-purple-100 text-purple-600 rounded-full">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm text-gray-700">New scheme uploaded for Mathematics</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="p-2 bg-green-100 text-green-600 rounded-full">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm text-gray-700">Teacher Mary assigned to Class 3B</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </li>
            </ul>
          </RectCard>
        </div>

        {/* Quick Actions */}
        <div>
          <RectCard title="Quick Actions">
            <div className="space-y-3">
              <button className="w-full p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Add New Student
              </button>
              <button className="w-full p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                Create New Class
              </button>
              <button className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                Generate Report
              </button>
            </div>
          </RectCard>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Attendance Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">This Month</span>
              <span className="font-medium text-gray-800">94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                style={{ width: "94%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              3 Events
            </span>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <p className="font-medium text-gray-800">Parent-Teacher Meeting</p>
              <p className="text-gray-500">March 15, 2024</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">Science Fair</p>
              <p className="text-gray-500">March 20, 2024</p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Server Status</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Backup</span>
              <span className="text-gray-800 font-medium">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}