import { Request, Response, Router } from "express";
import { generateResetPasswordFactory } from "../../useCases/resetPassword/generate/generateResetPasswordFactory";
import { findResetPasswordByTokenFactory } from "../../useCases/resetPassword/findByToken/findResetPasswordByTokenFactoy";

const resetPasswordRoutes = Router();

resetPasswordRoutes.post("/reset-password", (req: Request, res: Response) => {
  return generateResetPasswordFactory().handle(req, res);
});

resetPasswordRoutes.get("/reset-password", (req: Request, res: Response) => {
  return findResetPasswordByTokenFactory().handle(req, res);
});

export { resetPasswordRoutes };
