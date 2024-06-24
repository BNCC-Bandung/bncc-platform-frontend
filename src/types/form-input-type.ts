import type { AttendType, AttendanceType } from "./attendance-type";

interface FormInputType<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  attendData: AttendType;
  setAttendData: React.Dispatch<React.SetStateAction<AttendType>>;
  attendanceData?: AttendanceType[];
  setAttendanceData?: React.Dispatch<React.SetStateAction<AttendanceType[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isSuccess?: boolean;
  setIsSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  register?: () => void;
  login?: () => void;
  attend?: () => void;
  getAttendanceList?: (sessionId: number) => void;
  mutate?: (id: number) => void;
}

export type { FormInputType };
