import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ScheduleContext } from "context";
import { hours, days } from "../constants";
import { ScheduleCell } from "components/ScheduleCell";
import { HourSchedule } from "types";
import { styles } from "styles";

type ScheduleGridState = {
  selectedDays: Set<number>;
  selectedHours: Set<number>;
};

export const ScheduleGrid = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [state, setState] = useState<ScheduleGridState>({
    selectedDays: new Set(),
    selectedHours: new Set(),
  });
  const { selectedDays, selectedHours } = state;

  /* TODO: 
    onChange prop passed down to cells
      -> when a cell changes, call setSchedule() with all updated cells
  */

  const cellIsSelected = (day: number, hour: number) =>
    (selectedDays.has(day) && selectedHours.has(hour)) ||
    (selectedDays.has(day) && selectedHours.size === 0) ||
    (selectedHours.has(hour) && selectedDays.size === 0);

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

  const onHourClick = (hour: number) => {
    const previouslySelected = selectedHours.delete(hour);
    if (!previouslySelected) {
      selectedHours.add(hour);
    }
    setState({
      ...state,
      selectedHours,
    });
  };

  const onDayClick = (day: number) => {
    const previouslySelected = selectedDays.delete(day);
    if (!previouslySelected) {
      selectedDays.add(day);
    }
    setState({
      ...state,
      selectedDays,
    });
  };

  return (
    <Container>
      <Table>
        <tbody>
          <tr>
            <td></td>
            {schedule[0].map((_, hourIndex) => (
              <td key={hourIndex}>
                <HourHeaderCell
                  onClick={() => onHourClick(hourIndex)}
                  selected={selectedHours.has(hourIndex)}
                >
                  {hours[hourIndex]}
                </HourHeaderCell>
              </td>
            ))}
          </tr>
          {schedule.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td>
                <DayHeaderCell
                  onClick={() => onDayClick(dayIndex)}
                  selected={selectedDays.has(dayIndex)}
                >
                  {days[dayIndex]}
                </DayHeaderCell>
              </td>
              {day.map((hour, hourIndex) => (
                <ScheduleCell
                  key={hourIndex}
                  schedule={hour}
                  selected={cellIsSelected(dayIndex, hourIndex)}
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
  background-color: ${styles.darkerbg.hex()};
  padding: 0.5em 2em 2em 0;
  border-radius: ${styles.borderradius};
`;

const Table = styled.table`
  border-spacing: 0.2em;
`;

const HeaderCell = styled.div<{ selected: boolean }>`
  font-weight: 300;
  color: ${styles.litewite.hex()};
  letter-spacing: ${styles.letterspacing};
  border-radius: ${styles.borderradius};
  user-select: none;
  border: ${(props) =>
    `.1em solid ${props.selected ? styles.squallgreen : "transparent"}`};

  :hover {
    cursor: pointer;
    background-color: ${styles.darkbg.hex()};
  }
`;

const DayHeaderCell = styled(HeaderCell)`
  text-align: left;
  margin: 0 0.2em;
  padding: 1em 1em;
`;

const HourHeaderCell = styled(HeaderCell)`
  text-align: right;
  margin: 0;
  margin-bottom: 0.2em;
  padding: 0.75em 1em;
`;
