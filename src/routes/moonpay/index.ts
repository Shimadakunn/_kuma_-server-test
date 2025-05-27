import { Hono } from "hono";
import sign from "./sign.js";
import events from "./events.js";

const moonpay = new Hono();

moonpay.route("/", sign);
moonpay.route("/events", events);

export default moonpay;
