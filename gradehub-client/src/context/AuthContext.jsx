









































































import { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("gradehub_user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse user from local storage");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("gradehub_token");
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if ((token && !user) || (!token && user)) {
      logout();
    }
    setLoading(false);
  }, [token, user]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem("gradehub_user", JSON.stringify(data.user));
    localStorage.setItem("gradehub_token", data.token);

    setUser(data.user);
    setToken(data.token);

    return data.user;
  };

  const register = async (data) => {
    
    return login(data);
  };

  const logout = () => {
    localStorage.removeItem("gradehub_user");
    localStorage.removeItem("gradehub_token");

    setUser(null);
    setToken(null);
  };

  
  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem("gradehub_user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,

      
      isAuthenticated: !!token && !!user,

      login,
      logout,
      register,
      updateUser,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
