import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { Toaster } from "react-hot-toast";
import axios from 'axios';
// Create a context
const AuthContext = createContext();

// Provide the context
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem("sidebarState")
    }
  }, [user]);

  const login = (userData) => {
    // const user = JSON.parse(localStorage.getItem('user')); // Retrieve and parse the user object from localStorage
    setUser(userData);
    toast.success(`Welcome ${userData?.user?.name || '-'}`);
  };

const logout = async () => {
  setUser(null);
  localStorage.clear();
  toast.success("Logged out successfully");
};


  const toastSuccess = (text) => {
    toast.success(text);

  };
  const toastError = (text) => {
    toast.error(text);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return React.useContext(AuthContext);
};
