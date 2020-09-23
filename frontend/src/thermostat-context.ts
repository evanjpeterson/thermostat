import React from "react";
import { ThermostatGlobals } from "types";

export const ThermostatContext = React.createContext<ThermostatGlobals>({
  schedule: [],
});
