import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { createCustomerFactory } from "../../useCases/customers/create/createCustomerFactory";

const customerRoutes = Router();

customerRoutes.post(
  "/customers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createCustomerFactory().handle(req, res);
  }
);

export { customerRoutes };
