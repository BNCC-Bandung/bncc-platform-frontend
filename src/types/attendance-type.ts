import { SessionDataType } from "./session-data-type";

interface AttendType {
    status: number;
    track: {
        createdAt: string;
    };
}

interface AttendanceType extends AttendType {
    fullName: string;
    attendTime: string;
    status: number;
}

interface UserAttendanceType {
    userId: string;
    fullName: string;
}

interface AttendanceTotalType {
    totalUserAttendance: number;
    totalUserNotAttendance: number;
}

interface AttendancesType {
    session: SessionDataType;
    attendanceData: AttendanceTotalType;
    userAttendances: AttendanceType[];
}

export type { AttendType, AttendanceType, UserAttendanceType, AttendancesType };