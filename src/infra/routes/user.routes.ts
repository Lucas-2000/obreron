import { Request, Response, Router } from "express";
import { createUserFactory } from "../../useCases/users/create/createUserFactory";
import { findAllUsersFactory } from "../../useCases/users/findAll/findAllUsersFactory";
import { findUserByIdFactory } from "../../useCases/users/findById/findUserByIdFactory";
import { updateUserFactory } from "../../useCases/users/update/updateUserFactory";
import { deleteUserFactory } from "../../useCases/users/delete/deleteUserFactory";

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

userRoutes.patch("/users", (req: Request, res: Response) => {
  return updateUserFactory().handle(req, res);
});

userRoutes.delete("/users", (req: Request, res: Response) => {
  return deleteUserFactory().handle(req, res);
});

export { userRoutes };
