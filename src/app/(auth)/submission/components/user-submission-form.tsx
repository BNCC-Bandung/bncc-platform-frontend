import { SubmissionDataType } from "@/types/submission-data-type";
import {
  submissionSchema,
  SubmissionSchema,
} from "@/validations/submission-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useSubmitSubmission } from "@/api/api-backend";

export function FormUploadSubmission({
  submission,
}: {
  submission: SubmissionDataType;
}) {
  const { mutateAsync, isPending, error } = useSubmitSubmission(
    submission.courseId,
    submission.id
  );

  const form = useForm<SubmissionSchema>({
    resolver: zodResolver(submissionSchema),
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: SubmissionSchema) => {
    await mutateAsync(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line unused-imports/no-unused-vars
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl className="grid gap-2">
                <Input
                  type="file"
                  id="file"
                  className="w-fit"
                  accept="application/zip"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-red-900">
                {error?.message}{" "}
                {(error?.response?.data as { message: string })?.message}
              </FormDescription>
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="space-x-2"
        >
          <span>Upload</span>
          <UploadIcon />
        </Button>
      </form>
    </Form>
  );
}
