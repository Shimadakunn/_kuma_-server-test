import { Hono } from "hono";
import { serve } from "@hono/node-server";
import user from "./routes/user/index.js";
import waitingList from "./routes/waiting-list/index.js";
import moonpay from "./routes/moonpay/index.js";

import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    status: "okkkk",
    timestamp: new Date().toISOString(),
  });
});

app.route("/user", user);
app.route("/moonpay", moonpay);
app.route("/waiting-list", waitingList);

export default handle(app);
