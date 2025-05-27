import { Hono } from "hono";
import { validateEmail } from "../../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const waitingList = new Hono();

waitingList.get("/:email", validateEmail, async (c) => {
  // -- GET EMAIL
  const email = c.req.param("email");

  // -- GET WAITING LIST
  const waitingList = await prisma.waitingList.findFirst({
    where: { email },
  });
  if (waitingList)
    return c.json({ error: "Email already in waiting list" }, 400);

  // -- CREATE NEW WAITING LIST
  const newWaitingList = await prisma.waitingList.create({
    data: { email },
  });
  return c.json(newWaitingList);
});

export default waitingList;
