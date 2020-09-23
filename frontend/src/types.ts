declare global {
  interface Window {
    thermostatGlobals: ThermostatGlobals;
  }
}

export type ThermostatGlobals = {
  schedule: Schedule;
};

export type Schedule = DaySchedule[];

export type DaySchedule = HourSchedule[];

export type HourSchedule = {
  heat: boolean;
  cool: boolean;
  temp: number | null;
};

export type ScheduleContextData = {
  schedule: Schedule;
  setSchedule: (schedule: Schedule) => void;
};
