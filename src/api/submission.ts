import be from "./axios-instace";

// Function to get all submissions in a course
export async function getAllSubmissions(courseId: number) {
    try {
        const response = await be.get(`/courses/${courseId}/submissions`);
        return response.data.data.submissions;
    } catch (error) {
        throw error;
    }
}

// Function to get a submission in a course
export async function getSubmission(courseId: number, id: number) {
    try {
        const response = await be.get(`/courses/${courseId}/submissions/${id}`);
        return response.data.data.submission;
    } catch (error) {
        throw error;
    }
}

// Function to create a submission in a course
export async function createSubmission(courseId: number, data: any) {
    try {
        await be.post(`/courses/${courseId}/submissions`, data);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to delete a submission in a course
export async function deleteSubmission(courseId: number, id: number) {
    try {
        await be.delete(`/courses/${courseId}/submissions/${id}`);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to update a submission in a course
export async function updateSubmission(courseId: number, id: number, data: any) {
    try {
        await be.put(`/courses/${courseId}/submissions/${id}`, data);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to upload a file to a submission
export async function uploadSubmission(courseId: number, id: number, file: object) {
    try {
        await be.post(`/courses/${courseId}/submissions/${id}/submit`, file);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to download a file from a submission
export async function downloadSubmission(courseId: number, id: number) {
    try {
        const response = await be.get(`/courses/${courseId}/submissions/${id}/submit`);
        return response.data.data.currentSubmission;
    } catch (error) {
        throw error;
    }
}