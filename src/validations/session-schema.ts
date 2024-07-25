import { z } from 'zod';

export const sessionSchema = z.object({
    title: z.string().min(3),
    sessionNumber: z.coerce.number(),
    startTime: z.date(),
    endTime: z.date(),
    meetingUrl: z.string().url()
});

export type SessionSchema = z.infer<typeof sessionSchema>;