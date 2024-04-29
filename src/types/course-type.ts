interface CourseType<T> {
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    sessionData: T[];
    setSessionData: React.Dispatch<React.SetStateAction<T[]>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    getAllCourses: () => void;
    getCourse: (sessionId: number) => void;
    getUpcomingCourses: () => void;
}

export type { CourseType };