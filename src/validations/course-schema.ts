import { z } from "zod";

export const courseSchema = z.object({
    name: z.string().min(3),
    period: z.coerce.number(),
});

export type CourseSchema = z.infer<typeof courseSchema>;
