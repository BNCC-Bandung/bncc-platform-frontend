import { z } from "zod";

export const attendanceSchema = z.object({
    NIM: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "NIM must be a string with exactly 10 numeric characters",
    }),
    fullName: z.string().min(1, { message: "Fullname must not be empty" }),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;