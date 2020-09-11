import React from "react";
import "./App.css";

export const App = ({ ledEnabled }) => (
  <>
    <h1>Thermostat Control</h1>
    <p>LED is currently {ledEnabled ? "on" : "off"}</p>
    <p>
      <a href={ledEnabled ? "/led/off" : "/led/on"}>
        <button className={ledEnabled ? "button" : "button button2"}>
          Flip
        </button>
      </a>
    </p>
  </>
);
