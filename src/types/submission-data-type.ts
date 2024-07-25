interface SubmissionDataType {
    id: string
    courseId: string
    title: string
    deadlineTime: string
}

interface CurrentSubmissionDataType {
    userId: string
    url: string
    uploadTime: string
}

export type { SubmissionDataType, CurrentSubmissionDataType };