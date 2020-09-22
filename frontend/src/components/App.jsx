import React from "react";
import styled, { css } from "styled-components";
import { ScheduleGrid } from "components/ScheduleGrid";

export const App = () => (
  <>
    <h1>Thermostat Control</h1>
    <ScheduleGrid />
  </>
);

const Button = styled.button(
  ({ isOn }) => css`
    background-color: ${isOn ? "#4caf50" : "#555555"};
    border: none;
    color: white;
    padding: 16px 40px;
    text-decoration: none;
    font-size: 30px;
    margin: 2px;
    cursor: pointer;
  `
);
