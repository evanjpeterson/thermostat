import React, { useContext } from "react";
import { ThermostatContext } from "thermostat-context";

export const ScheduleGrid = () => {
  const { schedule } = useContext(ThermostatContext);

  return (
    <>
      {/* do a <tr/> with clickable hour cells */}
      {schedule.map((day, dayIndex) =>
        // open a <tr/> and do an initial clickable day cell
        day.map((hour, hourIndex) => (
          <p>
            d{dayIndex} h{hourIndex}
          </p>
        ))
      )}
    </>
  );
};
