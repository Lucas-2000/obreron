import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { countMorePopularsItemsFactory } from "./../../useCases/statistics/countMorePopularsItems/countMorePopularsItemsFactory";
import { totalAmountOnPeriodFactory } from "./../../useCases/statistics/totalAmountOnPeriod/totalAmountOnPeriodFactory";
import { totalAmountFactory } from "./../../useCases/statistics/totalAmount/totalAmountFactory";
import { countOrdersOnTheDayFactory } from "./../../useCases/statistics/countOrdersOnTheDay/countOrdersOnTheDayFactory";
import { countOrdersFactory } from "./../../useCases/statistics/countOrders/countOrdersFactory";

const statisticsRoutes = Router();

statisticsRoutes.get(
  "/statistics/countOrders/:restaurantId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return countOrdersFactory().handle(req, res);
  }
);

statisticsRoutes.get(
  "/statistics/countOrdersOnTheDay/:restaurantId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return countOrdersOnTheDayFactory().handle(req, res);
  }
);

statisticsRoutes.get(
  "/statistics/totalAmount/:restaurantId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return totalAmountFactory().handle(req, res);
  }
);

statisticsRoutes.get(
  "/statistics/totalAmountOnPeriod/:restaurantId/:startDate/:finalDate",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return totalAmountOnPeriodFactory().handle(req, res);
  }
);

statisticsRoutes.get(
  "/statistics/countMorePopularsItems/:restaurantId",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return countMorePopularsItemsFactory().handle(req, res);
  }
);

export { statisticsRoutes };
