import React from "react";
import styled from "styled-components";
import { styles } from "styles";

type ToggleableSetting = "heat" | "cool";

type SettingToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  mode: ToggleableSetting;
  text: string;
};

type NeutralToggleProps = Pick<SettingToggleProps, "enabled" | "onChange">;

const SettingToggle: React.FunctionComponent<SettingToggleProps> = ({
  enabled,
  onChange,
  mode,
  text,
}) => {
  const handleClick = () => onChange(!enabled);

  return (
    <Toggle onClick={handleClick} mode={mode} enabled={enabled}>
      {text}
    </Toggle>
  );
};

export const CoolToggle: React.FunctionComponent<NeutralToggleProps> = (
  props
) => {
  return <SettingToggle {...props} mode="cool" text="C" />;
};

export const HeatToggle: React.FunctionComponent<NeutralToggleProps> = (
  props
) => {
  return <SettingToggle {...props} mode="heat" text="H" />;
};

const getToggleColor = (mode: ToggleableSetting, enabled: boolean) => {
  return enabled && mode === "cool"
    ? styles.coolblue
    : enabled && mode === "heat"
    ? styles.heatred
    : styles.lamegrey;
};

const Toggle = styled.div<Pick<SettingToggleProps, "mode" | "enabled">>`
  user-select: none;
  font-size: 0.9em;
  font-weight: ${(props) => (props.enabled ? 600 : 400)};
  color: ${(props) => getToggleColor(props.mode, props.enabled).hex()};

  :hover {
    cursor: pointer;
  }
`;
