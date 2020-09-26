import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { HourSchedule } from "types";
import { isNumber, parseNumber } from "utils";
import { styles } from "styles";
import { minTemp, maxTemp } from "../constants";
import { CoolToggle, HeatToggle } from "components/SettingToggle";

const minInputTemp = 0;
const maxInputTemp = 99;

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
      const safeTemp = Math.min(Math.max(temp, minInputTemp), maxInputTemp);
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
          schedule={schedule}
        />
      </InnerCell>
    </Cell>
  );
};

const getTempColor = (schedule: HourSchedule) => {
  const { heat, cool, temp } = schedule;

  if (!temp || !(heat || cool)) {
    return styles.lamegrey;
  }

  const baseColor =
    heat && cool ? styles.bothpurple : heat ? styles.heatred : styles.coolblue;

  // Cap dynamic colors within a range of temperatures the thermostat will actually accept.
  const safeTemp = Math.min(Math.max(temp, minTemp), maxTemp);
  // Find the mid-temperature in the range and figure out how far away the selected temperature is.
  const midTemp = minTemp + (maxTemp - minTemp) / 2;
  const tempDistance = safeTemp - midTemp;
  // Convert to a scalar than can be used to lighten/darken the base color.
  const colorDamper = 3;
  const colorDifferential = tempDistance / ((midTemp - minTemp) * colorDamper);

  return colorDifferential > 0
    ? baseColor.darken(colorDifferential)
    : baseColor.lighten(Math.abs(colorDifferential));
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

const TempInput = styled.input<Pick<ScheduleCellProps, "schedule">>`
  max-width: 2em;
  font-size: 2em;
  text-align: right;
  border: none;
  background: none;
  color: ${(props) => getTempColor(props.schedule).hex()};
  font-weight: 300;
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
