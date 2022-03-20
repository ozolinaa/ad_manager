import "core-js/features/array/flat-map";
import "core-js/features/map";
import "core-js/features/promise";
import "core-js/features/set";
import "raf/polyfill";
import "whatwg-fetch";
import "./globalStyles";
import React from "react";
import ReactDOM from "react-dom";
import App, {AppProps} from "src/core/components/App";
import { BrowserRouter } from "react-router-dom";
import { reactAppPropsKey } from "./consts";

// window[reactAppPropsKey] was set during server side rendering
const props = (window as any)[reactAppPropsKey] || {} as AppProps;
ReactDOM.hydrate(<BrowserRouter><App {...props} /></BrowserRouter>, document.getElementById("app-root"));
