"use client";
import type { AxiosError } from "axios";
import type { AuthType } from "../types/auth-type";
import type { UserProfileType } from "../types/user-data-type";
import { createContext, useState } from "react";
import axios from "@/api/axios-instace";
import { useRouter } from "next/navigation";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthType<UserProfileType> | null>(null);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const defaultUserData: UserProfileType = {
    fullName: "",
    NIM: "",
    email: "",
    address: "",
    phone: "",
    role: 0,
    enrollments: [],
    bnccId: "",
    isAdmin: false,
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [error, setError] = useState("");
  const router = useRouter();

  const getProfile = async () => {
    try {
      const response = await axios.get("/users/profile");
      const { user } = response.data.data;
      setUserData(user);
      setIsAuthenticated(true);
    } catch (err) {
      await refreshToken();
    }
  };

  const refreshToken = async () => {
    try {
      await axios.post("/auth/refresh");
      await getProfile();
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.delete("/auth/logout");
      setIsAuthenticated(false);
      router.push("/login");
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData,
    error,
    setError,
    getProfile,
    refreshToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
