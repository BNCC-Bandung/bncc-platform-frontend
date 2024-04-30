import be from "./axios-instace";

// Function to add user attendance
export async function addUserAttendance(bnccId: string, nim: string) {
    try {
        const response = await be.post(`/v1/attendances/`, { bnccId, NIM: nim });
        return response.data.data.attendance;
    } catch (error) {
        throw error;
    }
}

// Function to get all attendances in a session
export async function getAttendancesInSession(bnccId: string, sessionId: number) {
    try {
        const response = await be.get(`/v1/attendances/sessions/${sessionId}`, {
            params: { bnccId }
        });
        return response.data.data.attendances;
    } catch (error) {
        throw error;
    }
}

// Function to convert attendance session to Excel
export async function getAttendanceInSessionToExcel(bnccId: string, sessionId: number) {
    try {
        const response = await be.get(`/v1/attendances/sessions/${sessionId}/excel`, {
            params: { bnccId }
        });
        return response.data.data.path;
    } catch (error) {
        throw error;
    }
}

// Function to download attendances in Excel format
export async function downloadAttendancesInExcel(bnccId: string, sessionId: number) {
    try {
        await be.get(`/v1/attendances/sessions/${sessionId}/excel/download`, {
            params: { bnccId },
            responseType: 'stream' // Specify response type as stream for file download
        });
        return true; // Successfully initiated download
    } catch (error) {
        throw error;
    }
}
