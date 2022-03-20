import { Express } from "express";
import cors from "cors";
import ipLocator from "server/clients/ipLocator";
import { getUserProfile, isAuthorized } from "server/utils/auth";

export default (app: Express) => {
  app.post("/getIPLocation", async (req, res) => {
    if(!isAuthorized(getUserProfile(req))) {
        res.status(403)
        res.send();
        return;
    }

    const reqData = req.body as unknown as {ip: string};
    const ipLocation = await ipLocator.getIPLocation(reqData.ip);
  
    res.set("Content-Type", "text/javascript; charset=utf-8");
    return res.send(ipLocation);
  });
};
