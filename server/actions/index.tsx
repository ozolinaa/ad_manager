import express, { Express } from "express";
import renderReactApp from "server/utils/renderReactApp";

export default (app: Express) => {
  // important to exlude index.html https://stackoverflow.com/questions/65210784/exclude-index-html-from-express-static-when-serving-react-app-with-express/70693257#70693257
  app.use(express.static("././dist", {index: false}));
  app.get("/*", async (req, res) => {
    const html = await renderReactApp(req);
    return res.send(html);
  });
};
