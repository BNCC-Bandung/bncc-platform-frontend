"use client";
import type { AxiosError } from "axios";
import type { FormInputType } from "@/types/form-input-type";
import type {
  AttendType,
  AttendanceType,
  UserAttendanceType,
} from "@/types/attendance-type";
import { createContext, useState } from "react";
import axios from "@/api/axios-instance";

interface AttendanceContextProviderProps {
  children: React.ReactNode;
}

const AttendanceContext =
  createContext<FormInputType<UserAttendanceType> | null>(null);

const AttendanceContextProvider: React.FC<AttendanceContextProviderProps> = ({
  children,
}) => {
  const defaultData: UserAttendanceType = {
    NIM: "",
    fullName: "",
  };

  const attendDefaultData: AttendType = {
    status: 0,
    track: {
      createdAt: "string",
    },
  };

  const [data, setData] = useState(defaultData);
  const [attendData, setAttendData] = useState(attendDefaultData);
  const [attendanceData, setAttendanceData] = useState<AttendanceType[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const attend = async () => {
    try {
      const response = await axios.post("/attendances", data);
      const { attendance } = response.data.data;
      setAttendData(attendance);
      setData(defaultData);
      setError("");
      setIsSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const getAttendanceList = async (sessionId: number) => {
    try {
      const response = await axios.get(`/attendances/sessions/${sessionId}`);
      const { attendances } = response.data.data;
      setAttendanceData(attendances);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const value = {
    data,
    setData,
    attendData,
    setAttendData,
    attendanceData,
    setAttendanceData,
    error,
    setError,
    isSuccess,
    setIsSuccess,
    attend,
    getAttendanceList,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export { AttendanceContext, AttendanceContextProvider };
