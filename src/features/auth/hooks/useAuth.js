// Code snippets taken from https://usehooks.com/useAuth/
import React, { useState, useContext, createContext, useEffect } from "react";

import AuthService from "../services/authService";

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

  const login = (phone, password, cb) =>
    AuthService.login(phone, password).then((res) => {
      setUser(res.data);
      cb();
    });

  const register = (phone, password, inviteCode, dateOfBirth, cb) =>
    AuthService.register(phone, password, inviteCode, dateOfBirth).then((res) =>
      AuthService.login(phone, password).then((res) => {
        setUser(res.data);
        cb();
      })
    );

  const logout = () => {
    setUser(false);
    return AuthService.logout();
  };

  // For debugging only
  const ping = () => {
    AuthService.profile()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    AuthService.profile()
      .then((res) => setUser(res.data.user))
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
