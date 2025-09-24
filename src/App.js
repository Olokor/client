import { LayoutDashboard } from 'lucide-react';
import './App.css';
  
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from './component/Dashboard/DashboardLayout';
import ManageTeachers from './pages/ManageTeachers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path='/admin/teachers' element={<ManageTeachers/>} />
      </Routes>
    </Router>
  );
}

export default App;
