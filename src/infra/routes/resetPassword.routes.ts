import { Request, Response, Router } from "express";
import { generateResetPasswordFactory } from "../../useCases/resetPassword/generate/generateResetPasswordFactory";

const resetPasswordRoutes = Router();

resetPasswordRoutes.post("/reset-password", (req: Request, res: Response) => {
  return generateResetPasswordFactory().handle(req, res);
});

export { resetPasswordRoutes };
