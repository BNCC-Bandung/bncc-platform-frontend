export interface dataCourseDummy {
    title: string;
    time: string;
    session: number;
    subject: string;
    date: string;
}

export interface typeSubmissionAdminDummy {
    title: string;
    deadline: string;
    status: number;
}

export interface typeAssignmentSubmissionDummy {
    name: string;
    dateSubmit: string;
}

export interface typeListAssignment {
    name: string;
    deadline: string;
    lastSubmission: string;
    status: number;
}
