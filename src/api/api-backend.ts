import { toast } from "sonner"
import axios from "./axios-instance";
import { EnrollmentsCourseType, UserProfileType } from "@/types/user-data-type";
import { SessionDataType } from "@/types/session-data-type";
import { AxiosError } from "axios";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/validations/login-schema";
import { CourseDataType } from "@/types/course-data-type";
import { queryClient } from "@/components/contexts/ReactQueryProvider";
import { SessionSchema } from "@/validations/session-schema";
import { CurrentSubmissionDataType, SubmissionDataType, SubmittedDataType } from "@/types/submission-data-type";
import { SubmissionSchema } from "@/validations/submission-schema";
import { format } from "date-fns";
import { AssignmentSchema } from "@/validations/assignment-schema";
import { CURRENT_DATE_FORMAT } from "@/lib/date";
import { AttendancesType } from "@/types/attendance-type";
import { CourseSchema } from "@/validations/course-schema";

async function getUserProfile() {
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
  } catch (err) {
    const axiosError = err as AxiosError<any>;
    throw new Error(axiosError.response?.data.message);
  }
}

// REACT QUERY

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginSchema) => {
      await axios.post("/auth/login", values);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });
}

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await axios.delete("/auth/logout");
        return response.data.data;
      } catch (err) {
        const axiosError = err as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
  });
}

export function useGetAllSessions(courseId: string, options?: Omit<UseQueryOptions<SessionDataType[]>, "queryKey">) {
  return useQuery({
    queryKey: ["sessions", courseId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/sessions`);
        return response.data.data.sessions as SessionDataType[];
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
    ...options,
  });
}

export function useGetAllCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const response = await axios.get("/courses");
        return response.data.data.courses as CourseDataType[];
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useGetCourse(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}`);
        return response.data.data.course as CourseDataType;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useEnrollCourse() {
  return useMutation({
    mutationKey: ["enroll"],
    mutationFn: async (courseId: string) => {
      try {
        const response = await axios.post(`/courses/${courseId}/enrollment`);
        return response.data.message;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["profile"] }
      )
    }
  });
}

export function useUnenrollCourse() {
  return useMutation({
    mutationKey: ["unenroll"],
    mutationFn: async (courseId: string) => {
      try {
        const response = await axios.delete(`/courses/${courseId}/enrollment`);
        return response.data.message;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["profile"] }
      )
    }
  });
}

export function useUpcomingSessions(courseId: string) {
  return useQuery({
    queryKey: ["upcoming", courseId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/sessions/upcoming`);
        return response.data.data.sessions as SessionDataType[];
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useAddSession(courseId: string, setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["add-session"],
    mutationFn: async (values: SessionSchema) => {
      await axios.post(`/courses/${courseId}/sessions`, {
        ...values,
        startTime: format(values.startTime, CURRENT_DATE_FORMAT),
        endTime: format(values.endTime, CURRENT_DATE_FORMAT),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["sessions", courseId] }
      )
      toast.success("Session created successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useEditSession(courseId: string, sessionId: string, setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["edit-session"],
    mutationFn: async (values: SessionSchema) => {
      await axios.put(`/courses/${courseId}/sessions/${sessionId}`, {
        ...values,
        startTime: format(values.startTime, CURRENT_DATE_FORMAT),
        endTime: format(values.endTime, CURRENT_DATE_FORMAT),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["sessions", courseId] }
      )
      toast.success("Session updated successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useDeleteSession(courseId: string, sessionId: string) {
  return useMutation({
    mutationKey: ["delete-session"],
    mutationFn: async () => {
      await axios.delete(`/courses/${courseId}/sessions/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["sessions", courseId] }
      );
      toast.success("Session deleted successfully 🗑️");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useAddAssignment(courseId: string, setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["add-assignment"],
    mutationFn: async (values: AssignmentSchema) => {
      await axios.post(`/courses/${courseId}/submissions`, {
        ...values,
        deadlineTime: format(values.deadlineTime, CURRENT_DATE_FORMAT),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["submissions", courseId] }
      )
      toast.success("Assignment created successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useEditAssignment(courseId: string, sessionId: string, setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["edit-assignment"],
    mutationFn: async (values: AssignmentSchema) => {
      await axios.put(`/courses/${courseId}/submissions/${sessionId}`, {
        ...values,
        deadlineTime: format(values.deadlineTime, CURRENT_DATE_FORMAT),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["submissions", courseId] }
      )
      toast.success("Assignment updated successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useDeleteAssignment(courseId: string, submissionId: string) {
  return useMutation({
    mutationKey: ["delete-assignment"],
    mutationFn: async () => {
      await axios.delete(`/courses/${courseId}/submissions/${submissionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["submissions", courseId] }
      );
      toast.success("Assignment deleted successfully 🗑️");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useGetAllSubmissions(courseId: string) {
  return useQuery({
    queryKey: ["submissions", courseId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/submissions`);
        return response.data.data.submissions as SubmissionDataType[];
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useGetSubmission(courseId: string, submissionId: string) {
  return useQuery({
    queryKey: ["submission", courseId, submissionId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/submissions/${submissionId}/submit`);
        return response.data.data.currentSubmission as CurrentSubmissionDataType;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useSubmitSubmission(courseId: string, submissionId: string) {
  return useMutation({
    mutationKey: ["submit-submission"],
    mutationFn: async (values: SubmissionSchema) => {
      const formData = new FormData();
      formData.append("submission", values.file[0]);
      await axios.post(`/courses/${courseId}/submissions/${submissionId}/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["submissions", courseId] }
      );
      toast.success("Submission uploaded successfully ✅");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useGetAllSubmitted(courseId: string, submissionId: string) {
  return useQuery({
    queryKey: ["submitted", courseId, submissionId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/submissions/${submissionId}`);
        return response.data.data.submission as SubmittedDataType;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useAddAttendance() {
  return useMutation({
    mutationKey: ["add-attendance"],
    mutationFn: async (values: { NIM: string; fullName: string }) => {
      await axios.post("/attendances", values);
    },
    onSuccess: () => {
      toast.success("Attendance created successfully ✅");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });
}

export function useGetAllAttendance(sessionId: string) {
  return useQuery({
    queryKey: ["attendance", sessionId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/attendances/sessions/${sessionId}`);
        return response.data.data as AttendancesType;
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    },
  });
}

export function useAddCourse(setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["add-course"],
    mutationFn: async (values: CourseSchema) => {
      await axios.post("/courses", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["courses"] }
      );
      toast.success("Course created successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  })
}

export function useEditCourse(courseId: string, setFormOpen: (isOpen: boolean) => void) {
  return useMutation({
    mutationKey: ["edit-course"],
    mutationFn: async (values: CourseSchema) => {
      await axios.put(`/courses/${courseId}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["courses"] }
      );
      toast.success("Course updated successfully ✅", {
        description: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
      setFormOpen(false);
    },
    onError: (error: AxiosError) => {
      return error;
    },
  })
}

export function useDeleteCourse() {
  return useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async (courseId: string) => {
      await axios.delete(`/courses/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["courses"] }
      );
      toast.success("Course deleted successfully 🗑️");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  })
}

export function useGetAllEnrollments(courseId: string) {
  return useQuery({
    queryKey: ["enrollments", courseId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/enrollment`);
        return response.data.data.enrollments as EnrollmentsCourseType[];
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        throw new Error(axiosError.response?.data.message);
      }
    }
  })
}

export function useApproveEnrollment(courseId: string, NIM: string) {
  return useMutation({
    mutationKey: ["approve-enrollment"],
    mutationFn: async () => {
      await axios.put(`/courses/${courseId}/enrollment/${NIM}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["enrollments", courseId] }
      );
      toast.success("Enrollment approved successfully ✅");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  })
}

export function useSetLecturerEnrollment(courseId: string, NIM: string) {
  return useMutation({
    mutationKey: ["set-lecturer-enrollment"],
    mutationFn: async () => {
      await axios.put(`/courses/${courseId}/enrollment/${NIM}/lecturer`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["enrollments", courseId] }
      );
      toast.success("Enrollment set as lecturer successfully ✅");
    },
    onError: (error: AxiosError) => {
      return error;
    },
  })
}
