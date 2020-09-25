import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ScheduleContext } from "context";
import { hours, days } from "../constants";
import { ScheduleCell } from "components/ScheduleCell";
import { HourSchedule } from "types";
import { styles } from "styles";

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
    <Container>
      <Table>
        <tbody>
          <tr>
            <td></td>
            {schedule[0].map((_, hourIndex) => (
              <td key={hourIndex}>
                <ColHeaderCellText>{hours[hourIndex]}</ColHeaderCellText>
              </td>
            ))}
          </tr>
          {schedule.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td>
                <RowHeaderCellText>{days[dayIndex]}</RowHeaderCellText>
              </td>
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
      </Table>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${styles.darkerbg};
  padding: 0.5em 2em 2em 0;
  border-radius: ${styles.borderradius};
`;

const Table = styled.table`
  border-spacing: 0.2em;
`;

const HeaderCellText = styled.p`
  font-weight: 300;
  color: ${styles.litewite};
  letter-spacing: ${styles.letterspacing};
  border-radius: ${styles.borderradius};

  :hover {
    cursor: pointer;
    background-color: ${styles.darkbg};
  }
`;

const RowHeaderCellText = styled(HeaderCellText)`
  text-align: left;
  margin: 0 0.2em;
  padding: 1em 1em;
`;

const ColHeaderCellText = styled(HeaderCellText)`
  text-align: right;
  margin: 0;
  margin-bottom: 0.2em;
  padding: 0.75em 1em;
`;
