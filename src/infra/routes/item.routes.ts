import { Request, Response, Router } from "express";
import { createItemFactory } from "../../useCases/items/create/createItemFactory";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const itemRoutes = Router();

itemRoutes.post(
  "/items",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return createItemFactory().handle(req, res);
  }
);

export { itemRoutes };
