import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import './styles/login.css'
import './styles/admin.css'
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
  );
}

export default App;
