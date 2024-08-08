import { z, ZodError, ZodIssue } from "zod";

export function tryParseObject<T extends z.ZodTypeAny>(
  schema: T,
  data: any
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    const errors = (error as ZodError).flatten((issue: ZodIssue) => ({
      message: issue.message,
      errorCode: issue.code,
    }));

    throw new Error(JSON.stringify(errors.fieldErrors));
  }
}
