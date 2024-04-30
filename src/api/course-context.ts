import { cookies } from "next/headers";
import be from "./axios-instace";
import { UserProfileType } from "@/types/user-data-type";
import { SessionDataType } from "@/types/session-data-type";
import { error } from "console";

let UserData: UserProfileType = {
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

// Function to get user profile
export async function getProfile() {

    try {
        const response = await be.get("/users/profile", {
            headers: {
                Cookie: cookies().toString(),
            },
        });

        UserData = response.data.data.user;
    } catch (err) {
        throw err;
    }

    return UserData;
}

// Function to get all sessions in a course
export async function getAllSessions() {
    try {
        const { courseId } = UserData.enrollments[0];
        const response = await be.get(`/courses/${courseId}/sessions`, {
            headers: {
                Cookie: cookies().toString(),
            },
        });
        return response.data.data.sessions as SessionDataType[];
    } catch (err) {
        console.error(err);
    }
}

// Function to get upcoming sessions in a course
export async function getUpcomingSessions(courseId: number) {
    try {
        const { courseId } = UserData.enrollments[0];
        const response = await be.get(`/courses/${courseId}/sessions/upcoming`);
        return response.data.data.sessions;
    } catch (err) {
        console.error(err);
    }
}