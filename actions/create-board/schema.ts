import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
      invalid_type_error: "Board title must be a string",
    })
    .min(3, {
      message: "Board title must be at least 3 characters long",
    }),
});
