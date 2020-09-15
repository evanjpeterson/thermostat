import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./components/app/App.jsx";

const root = document.createElement("div");
document.body.appendChild(root);

const thermostatGlobals = window.thermostatGlobals || {};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", sans-serif;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App ledEnabled={thermostatGlobals.ledEnabled || false} />
  </React.StrictMode>,
  root
);
