import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/app/App.jsx";

const root = document.createElement("div");
document.body.appendChild(root);

const thermostatGlobals = thermostatGlobals || {};

ReactDOM.render(
  <React.StrictMode>
    <App ledEnabled={thermostatGlobals.ledEnabled || false} />
  </React.StrictMode>,
  root
);
