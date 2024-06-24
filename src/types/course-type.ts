import { SessionDataType } from "./session-data-type";

interface CourseType<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  sessionData: T[];
  setSessionData: React.Dispatch<React.SetStateAction<T[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getCourse: (sessionId: number) => void;
  getUpcomingCourses: () => void;
  coursesData: T[] | undefined;
  isCoursesLoading: boolean;
}

export type { CourseType };
