import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ThermostatContext } from "thermostat-context";
import { App } from "components/App";

const root = document.createElement("div");
document.body.appendChild(root);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", sans-serif;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

const thermostatGlobals = window.thermostatGlobals || {};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThermostatContext.Provider value={thermostatGlobals}>
      <App />
    </ThermostatContext.Provider>
  </React.StrictMode>,
  root
);
