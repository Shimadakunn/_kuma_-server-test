import { Hono } from "hono";
import { serve } from "@hono/node-server";
import user from "./routes/user";
import waitingList from "./routes/waiting-list";
import moonpay from "./routes/moonpay";

const app = new Hono();

app.route("/user", user);
app.route("/moonpay", moonpay);
app.route("/waiting-list", waitingList);

const port = process.env.PORT || 3000;
serve({
  fetch: app.fetch,
  port: Number(port),
});
