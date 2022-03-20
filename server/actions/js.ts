import path from "path";
import fs from "fs";
import { Express } from "express";

const wordRexex = RegExp(/^[a-zA-Z0-9_]*$/);

export default (app: Express) => {
  app.get("/ad.js", (req, res) => {
    const fullUrl = `${req.protocol}://${req.hostname}`;

    const campaign = (req.query.campaign || "").toString();
    if (!wordRexex.exec(campaign)) {
      return res
        .status(500)
        .send("campaign query parameter is missing or invalid");
    }

    const adJsFile = path.resolve("./server/js/ad.js");
    fs.readFile(adJsFile, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("ad.js file not found");
      }
      res.set("Content-Type", "text/javascript; charset=utf-8");
      return res.send(
        data
          .replaceAll("{{campaign}}", campaign)
          .replaceAll("{{hostname}}", `${req.hostname}:${req.socket.localPort}`)
      );
    });
  });
};
