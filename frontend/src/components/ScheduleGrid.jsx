import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ThermostatContext } from "thermostat-context";

export const ScheduleGrid = () => {
  const { schedule } = useContext(ThermostatContext);

  return (
    <>
      <tr>
        <td> </td>
        {schedule[0].map((_, hourIndex) => (
          <td>h{hourIndex}</td>
        ))}
      </tr>
      {schedule.map((day, dayIndex) => (
        <tr>
          <td>d{dayIndex}</td>
          {day.map((hour) => (
            <td>_</td>
          ))}
        </tr>
      ))}
    </>
  );
};
