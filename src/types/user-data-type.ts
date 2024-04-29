interface UserDataType {
    fullName: string;
    NIM: string;
    email: string;
    address: string;
    phone: string;
    role: number;
}

interface UserLoginType {
    email: string;
    password: string;
}

interface UserRegisterType extends UserDataType {
    password: string;
    confirmPassword: string;
}

interface EnrollmentsCourseType {
    courseId: number;
    isLecturer: boolean;
    userId: string;
}

interface UserProfileType extends UserDataType {
    enrollments: EnrollmentsCourseType[];
    bnccId: string;
    isAdmin: boolean;
}

export type { UserLoginType, UserRegisterType, UserProfileType };