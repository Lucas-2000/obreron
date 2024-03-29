import express from "express";
import "express-async-errors";
import cors from "cors";
import { userRoutes } from "../routes/user.routes";
import { resetPasswordRoutes } from "../routes/resetPassword.routes";
import { restaurantRoutes } from "../routes/restaurant.routes";
import { itemRoutes } from "../routes/item.routes";
import { errorHandler } from "../../middlewares/errorHandler";
import { customerRoutes } from "../routes/customer.routes";
import { orderRoutes } from "../routes/order.routes";
import { statisticsRoutes } from "../routes/statistic.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(resetPasswordRoutes);
app.use(restaurantRoutes);
app.use(itemRoutes);
app.use(customerRoutes);
app.use(orderRoutes);
app.use(statisticsRoutes);

app.use(errorHandler);

app.listen(3333, () => console.log("🔥 Server listening on port 3333"));
