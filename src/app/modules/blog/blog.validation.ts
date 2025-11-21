import { z } from "zod";

// Create Blog Schema (Zod v4)
export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters"),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),

  author: z.string().optional(),
});

// Update schema: partial
export const updateBlogSchema = createBlogSchema.partial();

// Types
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
