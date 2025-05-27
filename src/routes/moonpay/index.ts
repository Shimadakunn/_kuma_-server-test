import { Hono } from "hono";
import sign from "./sign";
import events from "./events";

const moonpay = new Hono();

moonpay.route("/", sign);
moonpay.route("/events", events);

export default moonpay;
