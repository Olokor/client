import './App.css';

import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from './component/Dashboard/DashboardLayout';
import ManageTeachers from './pages/ManageTeachers';
import ContactPage from './pages/ContactPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import ManageStudents from './pages/ManageStudents';
import StudentLayout from './component/Dashboard/StudentLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/admin/students" element={
          <StudentLayout>
            <ManageStudents />
          </StudentLayout>
        } />
        <Route path="/admin/students/register" element={
          <StudentLayout>
            <StudentRegistrationPage />
          </StudentLayout>
        } />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;