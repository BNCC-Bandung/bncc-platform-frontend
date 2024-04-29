import type { AxiosError } from "axios";
import type { CourseType } from "../types/course-type";
import type { SessionDataType } from "../types/session-data-type";
import { createContext, useContext, useState } from "react";
import axios from "@/api/axios-instace";
import { AuthContext } from "./AuthContext";

interface CourseContextProviderProps {
  children: React.ReactNode;
}

const CourseContext = createContext<CourseType<SessionDataType> | null>(null);

const CourseContextProvider: React.FC<CourseContextProviderProps> = ({
  children,
}) => {
  const defaultData: SessionDataType = {
    id: 0,
    courseId: 0,
    title: "string",
    sessionNumber: 0,
    startTime: "string",
    endTime: "string",
    meetingUrl: "string",
  };

  const { userData } = useContext(AuthContext)!;
  const [data, setData] = useState(defaultData);
  const [sessionData, setSessionData] = useState<SessionDataType[]>([]);
  const [error, setError] = useState("");

  const getAllCourses = async () => {
    try {
      const { courseId } = userData.enrollments[0];
      const response = await axios.get(`/courses/${courseId}/sessions`);
      const { sessions } = response.data.data;
      setSessionData(sessions);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const getCourse = async (sessionId: number) => {
    try {
      const { courseId } = userData.enrollments[0];
      const response = await axios.get(
        `/courses/${courseId}/sessions/${sessionId}`
      );
      const { session } = response.data.data;
      setData(session);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const getUpcomingCourses = async () => {
    try {
      const { courseId } = userData.enrollments[0];
      const response = await axios.get(
        `/courses/${courseId}/sessions/upcoming`
      );
      const { sessions } = response.data.data;
      setSessionData(sessions);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  };

  const value = {
    data,
    setData,
    sessionData,
    setSessionData,
    error,
    setError,
    getAllCourses,
    getCourse,
    getUpcomingCourses,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export { CourseContext, CourseContextProvider };
