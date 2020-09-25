import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ScheduleContext } from "context";
import { App } from "components/App";
import { useScheduleContextData } from "hooks";
import { styles } from "styles";

import "normalize.css";

const root = document.createElement("div");
document.body.appendChild(root);

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    font-family: "Helvetica Neue", sans-serif;
    display: flex;
    justify-content: center;
    text-align: center;
    background: ${styles.darkestbg};
  }
`;

const thermostatGlobals = window.thermostatGlobals || { schedule: [] };

const Root = () => {
  const scheduleContextData = useScheduleContextData(
    thermostatGlobals.schedule
  );

  return (
    <React.StrictMode>
      <GlobalStyle />
      <ScheduleContext.Provider value={scheduleContextData}>
        <App />
      </ScheduleContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, root);
