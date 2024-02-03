import { Request, Response, Router } from "express";
import { createItemFactory } from "../../useCases/items/create/createItemFactory";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { findItemsByUserIdFactory } from "../../useCases/items/findByUserId/findItemsByUserIdFactory";

const itemRoutes = Router();

itemRoutes.post(
  "/items",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createItemFactory().handle(req, res);
  }
);

itemRoutes.get("/items", ensureAuthenticated, (req: Request, res: Response) => {
  return findItemsByUserIdFactory().handle(req, res);
});

export { itemRoutes };
