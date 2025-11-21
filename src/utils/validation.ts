// utils/validate.ts
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const formatted = parsed.error.flatten();

      return res.status(400).json({
        ok: false,
        message: "Validation error",
        errors: formatted.fieldErrors,
      });
    }

    req.body = parsed.data; // safe parsed data
    next();
  };
