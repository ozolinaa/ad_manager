import express from "express";
import index from "./actions/index";
import js from "./actions/js";
import adJsHandlePost from "./actions/adJsHandlePost";
import auth from "./actions/auth";
import bodyParser from 'body-parser'



import https from "https";
import fs from "fs";

// allow using fetch by node
import fetch from "node-fetch";
import getIPLocation from "./actions/authorized/getIPLocation";
(globalThis as unknown as { fetch: typeof fetch }).fetch = fetch;

const app = express();
app.enable("trust proxy");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//
js(app);
adJsHandlePost(app);
auth(app);
//
getIPLocation(app);
//
index(app); // should be the last to capture all other requests


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
