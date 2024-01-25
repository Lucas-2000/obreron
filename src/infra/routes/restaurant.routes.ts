import { findRestaurantByUserIdFactory } from "../../useCases/restaurants/findByUserId/findRestaurantByUserIdFactory";
import { updateRestaurantFactory } from "../../useCases/restaurants/update/updateRestaurantFactory";
import { createRestaurantFactory } from "./../../useCases/restaurants/create/createRestaurantFactory";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { Request, Response, Router } from "express";

const restaurantRoutes = Router();

restaurantRoutes.post(
  "/restaurants",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createRestaurantFactory().handle(req, res);
  }
);

restaurantRoutes.get(
  "/restaurants",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return findRestaurantByUserIdFactory().handle(req, res);
  }
);

restaurantRoutes.patch(
  "/restaurants",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updateRestaurantFactory().handle(req, res);
  }
);

export { restaurantRoutes };
