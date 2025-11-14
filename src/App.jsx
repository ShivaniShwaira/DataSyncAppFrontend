import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import MinorMembers from "./pages/MinorMember";
import AddMinor from "./pages/AddMinor";
import AuthProvider from "./context/AuthContextFile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/minors" element={<MinorMembers />} />
          <Route path="/add-minor" element={<AddMinor />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
