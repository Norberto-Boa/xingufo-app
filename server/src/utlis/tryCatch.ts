import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const tryCatch =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof ZodError) {
          return next(error.issues);
        }
        return next({
          status: "Error",
          message: error.message,
        });
      }

      console.log(error);
      return next(error);
    }
  };

export { tryCatch };
