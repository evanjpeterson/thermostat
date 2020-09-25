import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";
import { HourSchedule } from "types";
import { isNumber, parseNumber } from "utils";
import { styles } from "styles";
import { minTemp, maxTemp } from "../constants";

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
      const safeTemp = Math.min(Math.max(temp, minTemp), maxTemp);
      onScheduleChange({ ...schedule, temp: safeTemp });
    }
  };

  return (
    <Cell>
      <InnerCell>
        <TempInput
          type="string"
          maxLength={2}
          value={temp || ""}
          onChange={onTempChange}
          placeholder="-"
        ></TempInput>
      </InnerCell>
    </Cell>
  );
};

const Cell = styled.td`
  background: ${styles.almostdarkerbg};
  border-radius: ${styles.borderradius};
`;

const InnerCell = styled.div`
  height: 4em;
  width: 5em;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TempInput = styled.input`
  max-width: 2em;
  font-size: 2em;
  text-align: right;
  border: none;
  background: none;
  color: ${styles.litewite};
  font-weight: 200;
  margin-right: 0.1em;
  margin-bottom: 0.1em;
  text-align: center;

  ::placeholder {
    font-weight: 100;
    color: ${styles.litewite};
  }

  :focus {
    /* consumers of this app don't use screen readers */
    outline: none;

    ::placeholder {
      color: transparent;
    }
  }
`;
