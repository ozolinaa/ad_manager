import path from "path";
import express from "express";
import index from "./actions/index";
import js from "./actions/js";
import adJsHandlePost from "./actions/adJsHandlePost";
import auth from "./actions/auth";

import https from "https";
import fs from "fs";

// allow using fetch by node
import fetch from "node-fetch";
(globalThis as unknown as { fetch: typeof fetch }).fetch = fetch;

const app = express();
app.enable("trust proxy");

js(app);
adJsHandlePost(app);
auth(app);
index(app);


const port = parseInt(process.argv[process.argv.indexOf("--port") + 1]);
const useHttps = true;
if(useHttps) {
  const key = fs.readFileSync("./key.pem");
  const cert = fs.readFileSync("./cert.pem");
  const server = https.createServer({ key: key, cert: cert }, app);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port} using https`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port} using http`);
  });
}
