import { useState } from "react";
import { Schedule, ScheduleContextData } from "types";

export const useScheduleContextData = (
  initialSchedule: Schedule
): ScheduleContextData => {
  const [schedule, setSchedule] = useState(initialSchedule);

  // TODO: keep track of states to support an undo button

  return {
    schedule,
    setSchedule,
  };
};
