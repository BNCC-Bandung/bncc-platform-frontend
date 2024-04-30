import { cookies } from "next/headers";
import be from "./axios-instace";
import { SessionDataType } from "@/types/session-data-type";

// Function to add session
export async function addSession(courseId: number, data: object) {
    try {
        const response = await be.post(`/courses/${courseId}/sessions/`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



// Function to get a session in a course
export async function getSession(courseId: number, id: number) {
    try {
        const response = await be.get(`/courses/${courseId}/sessions/${id}`);
        return response.data.data.session;
    } catch (error) {
        throw error;
    }
}


// Function to update a session in a course
export async function updateSession(courseId: number, id: number, data: object) {
    try {
        await be.put(`/courses/${courseId}/sessions/${id}`, data);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to delete a session in a course
export async function deleteSession(courseId: number, id: number) {
    try {
        await be.delete(`/courses/${courseId}/sessions/${id}`);
        return true;
    } catch (error) {
        throw error;
    }
}