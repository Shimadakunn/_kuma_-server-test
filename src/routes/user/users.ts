import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { validateWallet, validateEmail, getUser } from "@utils/index.js";

const prisma = new PrismaClient().$extends(withAccelerate());

const router = new Hono();

router.get("/set/:wallet/:email", validateWallet, validateEmail, async (c) => {
  // -- GET USER
  const existingUser = await getUser(c.req.param("wallet"));

  // -- UPDATE USER LAST CONNECTED AT AND STOP
  if (existingUser) {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { lastConnectedAt: new Date() },
    });
    return c.json(existingUser);
  }

  // -- CREATE USER
  const user = await prisma.user.create({
    data: {
      wallet: c.req.param("wallet"),
      email: c.req.param("email"),
    },
  });

  // -- CREATE USER POSITION
  await prisma.userPosition.create({
    data: {
      userId: user.id,
      timestamp: new Date().toISOString(),
      vaultBalance: "0",
      lastRecordedBalance: "0",
      pendingYield: "0",
      pendingFee: "0",
      userBalance: "0",
      userPrincipal: "0",
      totalCollectedFees: "0",
    },
  });

  return c.json(user);
});

export default router;
