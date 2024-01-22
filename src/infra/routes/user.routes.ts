import { Request, Response, Router } from "express";
import { createUserFactory } from "../../useCases/users/create/createUserFactory";

const userRoutes = Router();

userRoutes.post("/users", (req: Request, res: Response) => {
  return createUserFactory().handle(req, res);
});

export { userRoutes };
