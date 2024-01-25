import { createRestaurantFactory } from "./../../useCases/restaurants/create/createRestaurantFactory";
import { Request, Response, Router } from "express";

const restaurantRoutes = Router();

restaurantRoutes.post("/restaurants", (req: Request, res: Response) => {
  return createRestaurantFactory().handle(req, res);
});

export { restaurantRoutes };
