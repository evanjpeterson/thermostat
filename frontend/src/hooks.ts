import { useState } from "react";
import { Schedule, ScheduleContextData } from "types";

export const useScheduleContextData = (
  initialSchedule: Schedule
): ScheduleContextData => {
  const [schedule, setSchedule] = useState(initialSchedule);

  return {
    schedule,
    setSchedule,
  };
};
