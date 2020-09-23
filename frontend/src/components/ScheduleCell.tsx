import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";
import { HourSchedule } from "types";
import { isNumber, parseNumber } from "utils";

type ScheduleCellProps = {
  schedule: HourSchedule;
  onScheduleChange: (schedule: HourSchedule) => void;
};

export const ScheduleCell: React.FunctionComponent<ScheduleCellProps> = ({
  schedule,
  onScheduleChange,
}) => {
  const { cool, heat, temp } = schedule;

  const onTempChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const rawTemp = e.currentTarget.value;

    if (rawTemp === "") {
      onScheduleChange({ ...schedule, temp: null });
      return;
    }

    const temp = parseNumber(rawTemp);

    if (isNumber(temp)) {
      onScheduleChange({ ...schedule, temp });
    }
  };

  return (
    <Cell>
      <TempInput
        type="string"
        value={temp || ""}
        onChange={onTempChange}
        placeholder="-"
      ></TempInput>
    </Cell>
  );
};

const Cell = styled.td`
  width: 5em;
  height: 4em;
`;

const TempInput = styled.input`
  max-width: 4em;
  max-height: 4em;
  font-size: 1em;
  border: none;
`;
