import React from "react";
import styled, { css } from "styled-components";

export const App = ({ ledEnabled }) => (
  <>
    <h1>Thermostat Control</h1>
    <p>LED is currently {ledEnabled ? "on" : "off"}</p>
    <p>
      <a href={ledEnabled ? "/led/off" : "/led/on"}>
        <Button isOn={ledEnabled}>Flip</Button>
      </a>
    </p>
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
