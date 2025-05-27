import crypto from "crypto";
import { Hono } from "hono";

const router = new Hono();

router.post("/", async (c) => {
  // -- GET URL
  const { url } = await c.req.json();
  if (!url) return c.json({ error: "URL is required in request body" }, 400);

  console.log("url", url);

  const signature = crypto
    .createHmac("sha256", process.env.MOONPAY_API_KEY || "")
    .update(new URL(url).search)
    .digest("base64");

  console.log("signature", signature);
  return c.json({ signature });
});

export default router;
