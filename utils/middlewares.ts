import { Action } from "@prisma/client";
import type { Timeframe } from "./types";

const VALID_TIMEFRAMES: Timeframe[] = ["1H", "1D", "1W", "1M", "1Y", "MAX"];

export const validateWallet = async (c: any, next: any) => {
  const wallet = c.req.param("wallet");
  console.log("validateWallet", wallet);
  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return c.json({ error: "Invalid wallet format" }, 400);
  }
  await next();
};

export const validateAction = async (c: any, next: any) => {
  const action = c.req.param("action");
  console.log("validateAction", action);
  if (!Object.values(Action).includes(action as Action)) {
    return c.json({ error: "Invalid action" }, 400);
  }
  await next();
};

export const validateAmount = async (c: any, next: any) => {
  const amount = c.req.param("amount");
  console.log("validateAmount", amount);
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    return c.json({ error: "Invalid amount" }, 400);
  }
  await next();
};

export const validateEmail = async (c: any, next: any) => {
  const email = c.req.param("email");
  console.log("validateEmail", email);
  if (!email || !email.includes("@")) {
    return c.json({ error: "Invalid email" }, 400);
  }
  await next();
};

export const validateNotification = async (c: any, next: any) => {
  const notification = c.req.param("notification");
  console.log("validateNotification", notification);
  if (notification !== "true" && notification !== "false") {
    return c.json(
      { error: "Invalid notification - must be true or false" },
      400
    );
  }
  await next();
};

export const validateTimeframe = async (c: any, next: any) => {
  const timeframe = c.req.param("timeframe");
  console.log("validateTimeframe", timeframe);
  if (!VALID_TIMEFRAMES.includes(timeframe as Timeframe)) {
    return c.json({ error: "Invalid timeframe" }, 400);
  }
  await next();
};
