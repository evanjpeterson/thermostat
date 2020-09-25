import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { HourSchedule } from "types";
import { isNumber, parseNumber } from "utils";
import { styles } from "styles";
import { minTemp, maxTemp } from "../constants";
import { CoolToggle, HeatToggle } from "components/SettingToggle";

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

  const onCoolChange = (enabled: boolean) => {
    onScheduleChange({ ...schedule, cool: enabled });
  };

  const onHeatChange = (enabled: boolean) => {
    onScheduleChange({ ...schedule, heat: enabled });
  };

  return (
    <Cell>
      <InnerCell>
        <ToggleContainer>
          <HeatToggle enabled={heat} onChange={onHeatChange} />
          <CoolToggle enabled={cool} onChange={onCoolChange} />
        </ToggleContainer>
        <TempInput
          type="string"
          maxLength={2}
          value={temp || ""}
          onChange={onTempChange}
          placeholder="-"
        />
      </InnerCell>
    </Cell>
  );
};

const Cell = styled.td`
  background: ${styles.almostdarkerbg.hex()};
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

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 0.2em;

  div:first-child {
    margin-right: 0.5em;
  }
`;

const TempInput = styled.input`
  max-width: 2em;
  font-size: 2em;
  text-align: right;
  border: none;
  background: none;
  color: ${styles.litewite.hex()};
  font-weight: 200;
  margin-right: 0.1em;
  margin-bottom: 0.1em;
  text-align: center;

  ::placeholder {
    font-weight: 100;
    color: ${styles.litewite.hex()};
  }

  :focus {
    /* consumers of this app don't use screen readers */
    outline: none;

    ::placeholder {
      color: transparent;
    }
  }
`;
