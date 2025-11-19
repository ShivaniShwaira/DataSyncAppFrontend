import { createContext, useState } from "react";
import { logoutUser } from "../api/userApi";  
export const AuthContextFile = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (tokenVal) => {
    localStorage.setItem("token", tokenVal);
    setToken(tokenVal);
  };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };
const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log("Logout API failed (ignored):", err.response?.data);
    }

    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/"; 
  };

  return (
    <AuthContextFile.Provider value={{ token, login, logout }}>
      {children}
    </AuthContextFile.Provider>
  );
}
