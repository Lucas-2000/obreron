import express from "express";
import "express-async-errors";
import { userRoutes } from "../routes/user.routes";
import { resetPasswordRoutes } from "../routes/resetPassword.routes";

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(resetPasswordRoutes);

app.listen(3333, () => console.log("🔥 Server listening on port 3333"));
