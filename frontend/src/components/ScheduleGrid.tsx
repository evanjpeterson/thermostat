import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ThermostatContext } from "thermostat-context";
import { hours, days } from "../constants";
import { ScheduleCell } from "components/ScheduleCell";

export const ScheduleGrid = () => {
  const { schedule } = useContext(ThermostatContext);

  return (
    <>
      <tr>
        <td></td>
        {schedule[0].map((_, hourIndex) => (
          <td>{hours[hourIndex]}</td>
        ))}
      </tr>
      {schedule.map((day, dayIndex) => (
        <tr>
          <td>{days[dayIndex]}</td>
          {day.map((hour) => (
            <ScheduleCell />
          ))}
        </tr>
      ))}
    </>
  );
};
