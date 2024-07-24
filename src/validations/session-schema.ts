import { z } from "zod";

const dateRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
const customDateValidation = z.string().refine((date) => dateRegex.test(date), {
    message: "Invalid date format, should be 'dd-mm-yyyy hh:mm:ss'"
});

export const sessionSchema = z.object({
    title: z.string().min(3),
    sessionNumber: z.coerce.number(),
    startTime: customDateValidation,
    endTime: customDateValidation,
    meetingUrl: z.string().url()
});

export type SessionSchema = z.infer<typeof sessionSchema>;