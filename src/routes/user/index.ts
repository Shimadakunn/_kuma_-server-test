import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import userRoutes from "./users.js";
import positionsRoutes from "./positions/index.js";
import actionsRoutes from "./actions.js";
import notificationsRoutes from "./notifications.js";
import rewardsRoutes from "./rewards.js";

const user = new Hono();

// user.use("*", bearerAuth({ token: process.env.API_KEY || "" }));

user.route("/", userRoutes);
user.route("/positions", positionsRoutes);
user.route("/actions", actionsRoutes);
user.route("/notifications", notificationsRoutes);
user.route("/rewards", rewardsRoutes);

export default user;
