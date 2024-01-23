import { Request, Response, Router } from "express";
import { createUserFactory } from "../../useCases/users/create/createUserFactory";
import { findAllUsersFactory } from "../../useCases/users/findAll/findAllUsersFactory";
import { findUserByIdFactory } from "../../useCases/users/findById/findUserByIdFactory";

const userRoutes = Router();

userRoutes.post("/users", (req: Request, res: Response) => {
  return createUserFactory().handle(req, res);
});

userRoutes.get("/users", (req: Request, res: Response) => {
  const { id } = req.query;

  if (id !== undefined && typeof id === "string") {
    return findUserByIdFactory().handle(req, res);
  } else {
    return findAllUsersFactory().handle(req, res);
  }
});

export { userRoutes };
