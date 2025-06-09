import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await api.post("/user/login", { username, password });
    localStorage.setItem("token", response.data.token);
    setUser({ token: response.data.token, username });
    navigate("/app/dashboard"); // Updated path
  };

  const register = async (username, email, password) => {
    await api.post("/user/register", { username, email, password });
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Go to landing page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
