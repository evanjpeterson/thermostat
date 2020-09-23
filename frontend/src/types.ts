declare global {
  interface Window {
    thermostatGlobals: ThermostatGlobals;
  }
}

export type ThermostatGlobals = {
  schedule: Schedule;
};

export type Schedule = ScheduleDay[];

export type ScheduleDay = ScheduleHour[];

export type ScheduleHour = {
  heat: boolean;
  cool: boolean;
  temp: number | null;
};

export type ScheduleContextData = {
  schedule: Schedule;
  setSchedule: (schedule: Schedule) => void;
};
