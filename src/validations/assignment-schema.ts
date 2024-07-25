import { z } from "zod";

export const assignmentSchema = z.object({
    title: z.string(),
    deadlineTime: z.date(),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;