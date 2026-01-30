// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string;
  username: string;
  setIsAuthenticated: (value: boolean) => void;
  setUserId: (id: string) => void;
  setUsername: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [userId, setUserId] = useState<string>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? storedUserId : "";
  });

  const [username, setUsername] = useState<string>(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername ?? "";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, username, setIsAuthenticated, setUserId, setUsername }}
    >
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
