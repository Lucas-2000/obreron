import { countOrdersFactory } from "./../../useCases/statistics/countOrders/countOrdersFactory";
import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const statisticsRoutes = Router();

statisticsRoutes.get(
  "/statistics/countOrders/:restaurantId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return countOrdersFactory().handle(req, res);
  }
);

export { statisticsRoutes };
