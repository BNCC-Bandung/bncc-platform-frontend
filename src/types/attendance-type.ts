interface AttendType {
    status: number;
    track: {
        createdAt: string;
    };
}

interface AttendanceType {
    fullName: string;
    attendTime: string;
    status: number;
}

interface UserAttendanceType {
    NIM: string;
    fullName: string;
}

export type { AttendType, AttendanceType, UserAttendanceType };