import React from "react";
import { ScheduleHour } from "types";

type ScheduleCellProps = {
  hour: ScheduleHour;
};

export const ScheduleCell: React.FunctionComponent<ScheduleCellProps> = ({
  hour,
}) => {
  const { cool, heat, temp } = hour;

  return <td>{temp || "-"}</td>;
};
