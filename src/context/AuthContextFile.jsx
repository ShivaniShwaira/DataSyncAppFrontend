import { createContext, useState } from "react";

export const AuthContextFile = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (tokenVal) => {
    localStorage.setItem("token", tokenVal);
    setToken(tokenVal);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContextFile.Provider value={{ token, login, logout }}>
      {children}
    </AuthContextFile.Provider>
  );
}
