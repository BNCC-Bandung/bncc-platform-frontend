import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["application/zip"];

export const submissionSchema = z.object({
    file: z.any()
        .refine((files) => files?.length == 1, "File is required.")
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .zip file accepted."
        ),
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;