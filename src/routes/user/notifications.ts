import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getUser, validateNotification, validateWallet } from "@utils/index.js";

const prisma = new PrismaClient().$extends(withAccelerate());

const router = new Hono();

router.get("/get/:wallet", validateWallet, async (c) => {
  // -- GET USER
  const user = await getUser(c.req.param("wallet"));
  if (!user) return c.json({ error: "User not found" }, 404);

  // -- RETURN USER NOTIFICATIONS
  return c.json(user.notifications);
});

router.get(
  "/set/:wallet/:notification",
  validateWallet,
  validateNotification,
  async (c) => {
    // -- GET USER
    const user = await getUser(c.req.param("wallet"));
    if (!user) return c.json({ error: "User not found" }, 404);

    // -- UPDATE USER NOTIFICATIONS
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        notifications: c.req.param("notification") === "true",
      },
    });

    // -- RETURN UPDATED USER NOTIFICATIONS
    return c.json(updatedUser.notifications);
  }
);

export default router;
