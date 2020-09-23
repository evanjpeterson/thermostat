import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ScheduleContext } from "context";
import { hours, days } from "../constants";
import { ScheduleCell } from "components/ScheduleCell";
import { HourSchedule } from "types";

export const ScheduleGrid = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);

  /* TODO: needs state
    selected columns and rows
    onChange prop passed down to cells
      -> when a cell changes, call setSchedule() with all updated cells
    onClick prop passed down to header cells (hours and days)
      -> when clicked, add/remove from selected columns/rows
  */

  const onScheduleChange = (
    hourSchedule: HourSchedule,
    dayIndex: number,
    hourIndex: number
  ) => {
    // TODO: cleaner way to do this?
    // maybe create a map structure instead of an array for all the data hmmm?

    const newDaySchedule = [...schedule[dayIndex]];
    newDaySchedule.splice(hourIndex, 1, hourSchedule);

    const newSchedule = [...schedule];
    newSchedule.splice(dayIndex, 1, newDaySchedule);

    setSchedule(newSchedule);
  };

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {schedule[0].map((_, hourIndex) => (
            <td key={hourIndex}>{hours[hourIndex]}</td>
          ))}
        </tr>
        {schedule.map((day, dayIndex) => (
          <tr key={dayIndex}>
            <td>{days[dayIndex]}</td>
            {day.map((hour, hourIndex) => (
              <ScheduleCell
                key={hourIndex}
                schedule={hour}
                onScheduleChange={(schedule) =>
                  onScheduleChange(schedule, dayIndex, hourIndex)
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
