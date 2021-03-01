import * as React from 'react';

export type SettingType = {
  type: string;
  name: string;
};

function SettingsToolbarItem(props: { setting: SettingType }) {
  return (
    <div
      className={`toolbar__item settings-toolbar__item settings-toolbar__item--${props.setting.type}`}
    >
      <h3>{props.setting.name}</h3>
    </div>
  );
}

export function SettingsToolbar(props: { settings: SettingType[]}) {
  return (
    <div className="toolbar settings-toolbar">
      {props.settings.map(s => <SettingsToolbarItem key={s.type} setting={s} />)}
    </div>
  );
}

