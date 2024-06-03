import axios from "./axios-instace";
import { UserProfileType } from "@/types/user-data-type";
import { SessionDataType } from "@/types/session-data-type";
import { AxiosError } from "axios";

// Function to get user profile
export async function getUserProfile() {
  try {
    const response = await axios.get("/users/profile");
    return response.data.data.user as UserProfileType;
  } catch (err) {
    await refreshToken();
  }
}

export async function refreshToken() {
  try {
    await axios.post("/auth/refresh");
    await getUserProfile();
  } catch (err) {
    const axiosError = err as AxiosError<any>;
    return axiosError.response?.data.message;
  }
}

export async function deleteSession() {
  try {
    const response = await axios.delete("/auth/logout");
    return response.data.data;
  } catch (err) {
    const axiosError = err as AxiosError<any>;
    return axiosError.response?.data.message;
  }
}

// // Function to get all sessions in a course
// export async function getAllSessions() {
//   try {
//     const { courseId } = UserData.enrollments[0];
//     const response = await be.get(`/courses/${courseId}/sessions`);
//     return response.data.data.sessions as SessionDataType[];
//   } catch (err) {}
// }

// // Function to get upcoming sessions in a course
// export async function getUpcomingSessions(courseId: number) {
//   try {
//     const { courseId } = UserData.enrollments[0];
//     const response = await be.get(`/courses/${courseId}/sessions/upcoming`);
//     return response.data.data.sessions;
//   } catch (err) {}
// }

// // Function to get all course submissions
// export async function getAllSubmissions() {
//   try {
//     const { courseId } = UserData.enrollments[0];
//     const response = await be.get(`/courses/${courseId}/submissions`);

//     return response.data.data.submissions;
//   } catch (err) {}
// }
