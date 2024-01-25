import { FindRestaurantByUserIdFactory } from "../../useCases/restaurants/findByUserId/findRestaurantByUserIdFactory";
import { createRestaurantFactory } from "./../../useCases/restaurants/create/createRestaurantFactory";
import { Request, Response, Router } from "express";

const restaurantRoutes = Router();

restaurantRoutes.post("/restaurants", (req: Request, res: Response) => {
  return createRestaurantFactory().handle(req, res);
});

restaurantRoutes.get("/restaurants", (req: Request, res: Response) => {
  return FindRestaurantByUserIdFactory().handle(req, res);
});

export { restaurantRoutes };
