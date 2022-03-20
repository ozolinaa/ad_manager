import React from "react";
import ReactApp, { AppProps } from "src/core/components/App";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { StaticRouter } from "react-router-dom/server";
import { Request } from 'express';
import { getUserProfile, isAuthorized } from "./auth";
import { reactAppPropsKey } from 'src/consts'

export default (req: Request): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
      const indexHtmlFilePath = path.resolve("././dist/index.html");
      fs.readFile(indexHtmlFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Something went wrong:", err);
          return reject("Oops, better luck next time!");
        }

        const userProfile = getUserProfile(req)
        const props: AppProps = {
          userProfile: isAuthorized(userProfile) ? userProfile : undefined
        }
  
        const sheet = new ServerStyleSheet();
        let reactNodeHtml = "";
        let styleTags = "";
        try {
          reactNodeHtml = ReactDOMServer.renderToString(
            <StaticRouter location={req.url}>
              <StyleSheetManager sheet={sheet.instance}>
                <ReactApp {...props} />
              </StyleSheetManager>
            </StaticRouter>
          );
          styleTags = sheet.getStyleTags();
        } catch (error) {
          console.error(error);
        } finally {
          sheet.seal();
        }

        const scriptThatAllowsUIToGetAccessToPropsGeneratedByServer = `<script>window["${reactAppPropsKey}"]=${JSON.stringify(props)}</script>`;
        resolve(
          data
            .replace("</head>", `${styleTags}\n${scriptThatAllowsUIToGetAccessToPropsGeneratedByServer}\n</head>`)
            .replace(
              '<div id="app-root"></div>',
              `<div id="app-root">${reactNodeHtml}</div>`
            )
        );
      });
  });
}