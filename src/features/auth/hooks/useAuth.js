// Code snippets taken from https://usehooks.com/useAuth/
import React, { useState, useContext, createContext, useEffect } from "react";

import {
  loginService,
  logoutService,
  profileService,
  registerService,
} from "../services/authService";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = (email, password, cb) =>
    loginService(email, password).then((res) => {
      setUser(res.data);
      cb();
    });

  const register = (
    email,
    password,
    phone,
    firstName,
    lastName,
    isClient,
    isAgent,
    cb
  ) =>
    registerService(
      email,
      password,
      phone,
      firstName,
      lastName,
      isClient,
      isAgent
    ).then((res) =>
      loginService(email, password).then((res) => {
        setUser(res.data);
        cb();
      })
    );

  const logout = () => {
    setUser(false);
    return logoutService();
  };

  // For debugging only
  const ping = () => {
    profileService()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    profileService()
      .then((res) => setUser(res.data))
      .catch((err) => {
        setUser(false);
      });
  }, []);

  // Return the user object and auth methods
  return {
    user,
    login,
    register,
    logout,
    ping,
  };
}
