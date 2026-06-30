import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = (token, userData) => {
    localStorage.setItem("mailpilot_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("mailpilot_token");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("mailpilot_token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem("mailpilot_token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};