import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import userRoutes from "./user";
import positionsRoutes from "./positions";
import actionsRoutes from "./actions";
import notificationsRoutes from "./notifications";
import rewardsRoutes from "./rewards";

const user = new Hono();

// user.use("*", bearerAuth({ token: process.env.API_KEY || "" }));

user.route("/", userRoutes);
user.route("/positions", positionsRoutes);
user.route("/actions", actionsRoutes);
user.route("/notifications", notificationsRoutes);
user.route("/rewards", rewardsRoutes);

export default user;
