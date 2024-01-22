import express from "express";
import "express-async-errors";
import { userRoutes } from "../routes/user.routes";

const app = express();

app.use(express.json());

app.use(userRoutes);

app.listen(3333, () => console.log("🔥 Server listening on port 3333"));
