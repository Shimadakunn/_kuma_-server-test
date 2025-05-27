import {
  getUser,
  validateWallet,
  validateAction,
  validateAmount,
} from "../../../utils/index.js";
import { Hono } from "hono";
import { PrismaClient, Action } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const router = new Hono();

router.get("/get/:wallet", validateWallet, async (c) => {
  // -- GET USER
  const user = await getUser(c.req.param("wallet"), true, false);
  if (!user) return c.json({ error: "User not found" }, 404);

  // -- RETURN USER ACTIONS
  return c.json(user.userActions);
});

router.get(
  "/set/:wallet/:action/:amount",
  validateWallet,
  validateAction,
  validateAmount,
  async (c) => {
    // -- GET USER
    const user = await getUser(c.req.param("wallet"));
    if (!user) return c.json({ error: "User not found" }, 404);

    // -- CREATE USER ACTION
    const userAction = await prisma.userAction.create({
      data: {
        userId: user.id,
        timestamp: new Date().toISOString(),
        action: c.req.param("action") as Action,
        amount: c.req.param("amount"),
        status: "success",
      },
    });

    // -- RETURN USER ACTION
    return c.json(userAction);
  }
);

export default router;
