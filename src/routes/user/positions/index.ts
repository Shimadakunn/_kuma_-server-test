import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  validateWallet,
  getUser,
  validateTimeframe,
  type Timeframe,
} from "../../../../utils/index.js";
import { setUserPosition } from "./set.js";
import { getUserPositions } from "./get.js";

const prisma = new PrismaClient().$extends(withAccelerate());

const router = new Hono();

router.get(
  "/get/:wallet/:timeframe",
  validateWallet,
  validateTimeframe,
  async (c) => {
    // -- GET USER
    const user = await getUser(c.req.param("wallet"), false, true);
    if (!user) return c.json({ error: "User not found" }, 404);

    // -- GET USER POSITIONS
    const timeframe = c.req.param("timeframe") as Timeframe;
    const userPositions = await getUserPositions(user, timeframe);

    // -- RETURN USER POSITIONS
    return c.json(userPositions);
  }
);

router.get("/set/:wallet", validateWallet, async (c) => {
  // -- GET USER
  const user = await getUser(c.req.param("wallet"), false, true);
  if (!user) return c.json({ error: "User not found" }, 404);

  // -- SET USER POSITION
  const userPosition = await setUserPosition(user);

  // -- RETURN USER POSITION
  return c.json(userPosition);
});

router.get("/set", async (c) => {
  // -- GET ALL USERS
  const users = await prisma.user.findMany();
  if (!users || users.length === 0)
    return c.json({ error: "No users found in the database" }, 404);

  // -- SET POSITION FOR EACH USER
  const userPositions = [];
  for (const user of users) {
    const userPosition = await setUserPosition(user);
    userPositions.push(userPosition);
  }

  // -- RETURN USER POSITIONS
  return c.json(userPositions);
});

export default router;
