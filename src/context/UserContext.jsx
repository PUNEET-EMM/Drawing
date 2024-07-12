import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import apiRequest from '../api/apiRequest';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const res = await apiRequest.post('/auth/login', { username,email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const res = await apiRequest.post('/auth/register', { username, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } catch (err) {
      console.error('Registration error', err);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
