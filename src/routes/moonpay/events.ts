import { Hono } from "hono";

const router = new Hono();

router.post("/", async (c) => {
  const { event } = await c.req.json();
  console.log("event", event);
  return c.json({ message: "Event received", event });
});

export default router;
