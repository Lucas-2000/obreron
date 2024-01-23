import { Request, Response, Router } from "express";
import { createUserFactory } from "../../useCases/users/create/createUserFactory";
import { findAllUsersFactory } from "../../useCases/users/findAll/findAllUsersFactory";

const userRoutes = Router();

userRoutes.post("/users", (req: Request, res: Response) => {
  return createUserFactory().handle(req, res);
});

userRoutes.get("/users", (req: Request, res: Response) => {
  return findAllUsersFactory().handle(req, res);
});

export { userRoutes };
