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

interface SubmittedDataType extends SubmissionDataType {
    submits: CurrentSubmissionDataType[];
}

export type { SubmissionDataType, CurrentSubmissionDataType, SubmittedDataType };