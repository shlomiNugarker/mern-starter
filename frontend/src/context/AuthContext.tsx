import { httpService } from "@/services/http.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await httpService.get("/api/auth/me", true);
        setUser(data.user);
      } catch (error) {
        console.error("Authentication error:", error);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await httpService.post("/api/auth/login", {
        email,
        password,
      });
      if (!data.token) {
        throw new Error("Login failed: No token received");
      }
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
