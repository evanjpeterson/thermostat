import React from "react";
import { ScheduleContextData } from "types";

const defaultScheduleContextData: ScheduleContextData = {
  schedule: [],
  setSchedule: () => {},
};

export const ScheduleContext = React.createContext<ScheduleContextData>(
  defaultScheduleContextData
);
