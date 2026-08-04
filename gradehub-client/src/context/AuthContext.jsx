import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for an existing login
  useEffect(() => {
    const storedUser = localStorage.getItem("gradehub_user");
    const storedToken = localStorage.getItem("gradehub_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Temporary mock authentication
    const isAdmin = credentials.email.includes("admin");
    const mockUser = {
      id: 1,
      firstName: "Ademola",
      lastName: "Oyelusi",
      fullName: "Ademola Oyelusi",
      email: credentials.email,

      role: isAdmin ? "admin" : "student",

      department: isAdmin ? "Academic Affairs" : "Agricultural Engineering",

      level: isAdmin ? "Administrator" : "400 Level",

      avatar: "https://i.pravatar.cc/150?img=12",
    };
    const mockToken = "mock-jwt-token";

    localStorage.setItem("gradehub_user", JSON.stringify(mockUser));

    localStorage.setItem("gradehub_token", mockToken);

    setUser(mockUser);
    setToken(mockToken);

    return mockUser;
  };

  const register = async (data) => {
    // Temporary
    return login(data);
  };

  const logout = () => {
    localStorage.removeItem("gradehub_user");
    localStorage.removeItem("gradehub_token");

    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,

      isAuthenticated: !!token,

      login,
      logout,
      register,
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
