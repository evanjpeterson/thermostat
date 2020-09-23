import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ScheduleContext } from "context";
import { hours, days } from "../constants";
import { ScheduleCell } from "components/ScheduleCell";

export const ScheduleGrid = () => {
  const { schedule } = useContext(ScheduleContext);

  /* TODO: needs state
    selected columns and rows
    onChange prop passed down to cells
      -> when a cell changes, call setSchedule() with all updated cells
  */

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
            <ScheduleCell hour={hour} />
          ))}
        </tr>
      ))}
    </>
  );
};
