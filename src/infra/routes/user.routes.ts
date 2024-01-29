import { Request, Response, Router } from "express";
import { createUserFactory } from "../../useCases/users/create/createUserFactory";
import { findAllUsersFactory } from "../../useCases/users/findAll/findAllUsersFactory";
import { findUserByIdFactory } from "../../useCases/users/findById/findUserByIdFactory";
import { updateUserFactory } from "../../useCases/users/update/updateUserFactory";
import { deleteUserFactory } from "../../useCases/users/delete/deleteUserFactory";
import { authUserFactory } from "../../useCases/users/auth/authUserFactory";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const userRoutes = Router();

userRoutes.post("/users", (req: Request, res: Response) => {
  return createUserFactory().handle(req, res);
});

userRoutes.get(
  "/users/all",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findAllUsersFactory().handle(req, res);
  }
);

userRoutes.get("/users", ensureAuthenticated, (req: Request, res: Response) => {
  return findUserByIdFactory().handle(req, res);
});

userRoutes.patch(
  "/users",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updateUserFactory().handle(req, res);
  }
);

userRoutes.patch("/users/:id", (req: Request, res: Response) => {
  return updateUserFactory().handle(req, res);
});

userRoutes.delete(
  "/users",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return deleteUserFactory().handle(req, res);
  }
);

userRoutes.post("/users/auth", (req: Request, res: Response) => {
  return authUserFactory().handle(req, res);
});

export { userRoutes };
