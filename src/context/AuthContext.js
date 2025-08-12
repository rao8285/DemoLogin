import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.log('Failed to load user', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      if (!name || !email || password.length < 6) {
        throw new Error('Validation error');
      }

      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];

      if (users.some(u => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = { name, email, password };
      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
    } finally {
       setTimeout(() => {
        setIsLoading(false);
      }, 80000);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find(
        u => u.email === email && u.password === password,
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 80000);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
