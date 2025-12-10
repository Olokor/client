import './App.css';

import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from './component/Dashboard/DashboardLayout';
import ManageTeachers from './pages/ManageTeachers';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;