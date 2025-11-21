import { z } from "zod";

// Create Project Schema
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),

  description: z
    .string()
    .min(1, "Description is required"),

  features: z
    .array(z.string())
    .optional(),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),

  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .optional()
    .or(z.literal("")),

  liveLink: z
    .string()
    .url("Live link must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// Update Project Schema (every field optional)
export const updateProjectSchema = createProjectSchema.partial();

// Types (optional)
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
