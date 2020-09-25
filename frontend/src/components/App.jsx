import React from "react";
import styled from "styled-components";
import { ScheduleGrid } from "components/ScheduleGrid";
import { styles } from "styles";

export const App = () => (
  <>
    <Header>Thermostat Schedule</Header>
    <ScheduleGrid />
  </>
);

const Header = styled.h1`
  color: ${styles.litewite};
  letter-spacing: ${styles.letterspacing};
  font-weight: 300;
`;
