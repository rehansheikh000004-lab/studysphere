import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const saved = localStorage.getItem("ss_user");
  const [user, setUser] = useState(saved ? JSON.parse(saved) : null);

  const login = (userData, token) => {
    localStorage.setItem("ss_user", JSON.stringify(userData));
    localStorage.setItem("ss_token", token || "");
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("ss_user");
    localStorage.removeItem("ss_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
