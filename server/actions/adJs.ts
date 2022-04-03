import path from "path";
import fs from "fs";
import { Express, Request, Response } from "express";
import cors from "cors";
import { getClientIp, getHostNameAndPort } from "server/utils/url";

import { Ad, RedirectAd } from "src/ad/types";
import ipLocator from "server/clients/ipLocator";
import { IPLocation } from "src/common/types";
import { getAdsByGeoAndTags } from "server/dataStore/adState";


const wordRexex = RegExp(/^[a-zA-Z0-9_]*$/);

interface AdJsPayload {
  adType: Ad['type'],
  adTags: string[],
  clientIp?: string
}

export default (app: Express) => {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.get("/ad.js", (req, res) => {
    const adType = (req.query.type || "").toString() as (Ad['type']);
    if (adType != 'banner' && adType != 'redirect') {
      return res.status(500).send(`ad type "${adType}" is not supported`);
    }
    const adTags = (req.query.tags || "").toString().split('.').filter((x) => !!x);
    if(adTags.length == 0) {
      return res.status(500).send('tags are required');
    }
    for (const tag of adTags) {
      if (!wordRexex.exec(tag)) {
        return res
          .status(500)
          .send("tag must be a single word");
      }    
    }

    const adJsPayload: AdJsPayload = {
      adType,
      adTags,
    }

    if(req.query.ip && typeof req.query.ip == 'string') {
      adJsPayload.clientIp = req.query.ip;
    }

    // TODO remove live below - this is for debugging purposes only
    adJsPayload.clientIp = getClientIp(req);

    const adJsFile = path.resolve("./server/adJs/ad.js");
    fs.readFile(adJsFile, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("ad.js file not found");
      }

      res.set("Content-Type", "text/javascript; charset=utf-8");
      return res.send(
        data
          .replaceAll("{{hostNameAndPort}}", getHostNameAndPort(req))
          .replaceAll("{{adJsPayloadJSON}}", JSON.stringify(adJsPayload))
      );
    });
  });

  app.post("/ad", async (req, res) => {
    res.set("Content-Type", "text/javascript; charset=utf-8");
    res.set("Access-Control-Allow-Origin", "*");

    const adJsPayload = req.body as AdJsPayload;
    const ip: string = adJsPayload.clientIp || getClientIp(req);

    try {
      const geo = await ipLocator.getIPLocation(ip);
      if(adJsPayload?.adType == 'redirect' && geo?.country?.name_en) {
        return handleRedirectAd(geo, adJsPayload.adTags, res);
      }
    } catch (error) {
      console.error(error);
    }

    return res.send('');
  });

  const handleRedirectAd = (geo: IPLocation, tags: string[], res: Response) => {
    const { redirectAds } = getAdsByGeoAndTags(geo.country.name_en, geo.region.name_en, geo.city.name_en, tags);
    
    const redirectAd: RedirectAd | undefined = redirectAds.length > 0 ? redirectAds[Math.floor(Math.random()*redirectAds.length)] : undefined;

    if(!redirectAd?.url) {
      return res.send('console.log("redirectAd found");');
    } 
  
    const redirectJsFile = path.resolve("./server/adJs/redirect.js");
    fs.readFile(redirectJsFile, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("redirect.js file not found");
      }
  
      return res.send(
        data
          .replaceAll("{{redirectUrl}}", redirectAd.url)
      );
    });
  }

};
