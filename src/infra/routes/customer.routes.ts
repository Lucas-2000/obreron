import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { createCustomerFactory } from "../../useCases/customers/create/createCustomerFactory";
import { findCustomersByUserIdFactory } from "./../../useCases/customers/findByUserId/findCustomersByUserIdFactory";
import { updateCustomerFactory } from "../../useCases/customers/update/updateCustomerFactory";
import { deleteCustomerFactory } from "../../useCases/customers/delete/deleteCustomerFactory";

const customerRoutes = Router();

customerRoutes.post(
  "/customers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createCustomerFactory().handle(req, res);
  }
);

customerRoutes.get(
  "/customers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findCustomersByUserIdFactory().handle(req, res);
  }
);

customerRoutes.patch(
  "/customers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updateCustomerFactory().handle(req, res);
  }
);

customerRoutes.delete(
  "/customers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return deleteCustomerFactory().handle(req, res);
  }
);

export { customerRoutes };
