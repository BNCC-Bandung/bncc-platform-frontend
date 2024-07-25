import { z } from "zod";

const dateRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;

export const customDateValidation = z.string().refine((date) => dateRegex.test(date), {
    message: "Invalid date format, should be 'dd-mm-yyyy hh:mm:ss'"
});
