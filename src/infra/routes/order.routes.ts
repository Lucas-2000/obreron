import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { createOrderFactory } from "../../useCases/orders/create/createOrderFactory";

const orderRoutes = Router();

orderRoutes.post(
  "/orders",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createOrderFactory().handle(req, res);
  }
);

export { orderRoutes };
