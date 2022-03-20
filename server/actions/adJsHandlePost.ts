import { Express } from "express";
import cors from "cors";
import ipLocator from "src/api/clients/ipLocator";

export default (app: Express) => {
  app.post("/ad", async (req, res) => {
    console.log("POST");
    res.set("Content-Type", "text/javascript; charset=utf-8");
    res.set("Access-Control-Allow-Origin", "*");

    const ip: string = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress as string);
    const geo = await ipLocator.getIPLocation(ip);
    return res.send(geo);
  });

  app.use(
    cors({
      origin: "*",
    })
  );
};
