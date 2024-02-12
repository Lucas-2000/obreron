import { findOrdersByCustomerIdFactory } from "./../../useCases/orders/findByCustomer/findOrdersByCustomerIdFactory";
import { findOrdersByUserIdAndDeliveryStatusFactory } from "./../../useCases/orders/findByUserIdAndDeliveryStatus/findOrdersByUserIdAndDeliveryStatusFactory";
import { findOrdersByUserIdFactory } from "./../../useCases/orders/findByUserId/findOrdersByUserIdFactory";
import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { createOrderFactory } from "../../useCases/orders/create/createOrderFactory";
import { findOrdersByUserIdAndActiveFactory } from "../../useCases/orders/findByUserIdAndActive/findOrdersByUserIdAndActiveFactory";
import { updateOrderFactory } from "../../useCases/orders/update/updateOrderFactory";

const orderRoutes = Router();

orderRoutes.post(
  "/orders",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createOrderFactory().handle(req, res);
  }
);

orderRoutes.get(
  "/orders/user",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findOrdersByUserIdFactory().handle(req, res);
  }
);

orderRoutes.get(
  "/orders/user/active",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findOrdersByUserIdAndActiveFactory().handle(req, res);
  }
);

orderRoutes.get(
  "/orders/user/:deliveryStatus",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findOrdersByUserIdAndDeliveryStatusFactory().handle(req, res);
  }
);

orderRoutes.get(
  "/orders/customer/:customerId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findOrdersByCustomerIdFactory().handle(req, res);
  }
);

orderRoutes.patch(
  "/orders",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updateOrderFactory().handle(req, res);
  }
);

export { orderRoutes };
