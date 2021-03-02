import * as React from 'react';
import { useState } from 'react';
import {
  WidgetDef,
  WidgetConfigInput,
  WidgetConfigDropdown,
  WidgetConfigRadio,
  WidgetConfigCheckbox,
  WidgetConfigButton,
} from '../../utils/widgetUtils';



type WidgetConfigType = 
  | WidgetConfigInput
  | WidgetConfigDropdown
  | WidgetConfigRadio
  | WidgetConfigCheckbox
  | WidgetConfigButton
;

type ConstrainedWidgetProps<T> = {
  config: T,
  onUpdateWidgetConfig: (config: T) => void;
};

function WidgetConfigComponentInput(props: ConstrainedWidgetProps<WidgetConfigInput>) {
  const [inputType, setInputType] = useState(props.config.inputType);
  const [required, setRequired] = useState(props.config.required);
  const [type, setType] = useState(props.config.type);
  const [value, setValue] = useState(props.config.value);

  return (
    <div className={`widget-config__item widget-config__item--${props.config.type}`}>
      <input
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
        onBlur={() => props.onUpdateWidgetConfig({ ...props.config, value, })}
      />
    </div>
  )
}

export type WidgetConfigComponentProps = {
  widget: WidgetDef;
  onUpdateWidget: (widget: WidgetDef) => void;
};

function WidgetConfigComponent(props: WidgetConfigComponentProps) {
  const onUpdateWidgetConfig = (config: WidgetConfigType) => {
    props.onUpdateWidget({
      ...props.widget,
      config,
    });
  };

  if (props.widget.config.type === 'input') {
    const config: WidgetConfigInput = props.widget.config;
    return <WidgetConfigComponentInput config={config} onUpdateWidgetConfig={onUpdateWidgetConfig} />
  }
}

export type WidgetConfigProps = WidgetConfigComponentProps & {
  widget: null | WidgetDef;
};

function WidgetConfig(props: WidgetConfigProps) {
  if (!props.widget) {
    return (
      <div className="widget-config">
        <div className="widget-config__item">
          <p>No widget selected.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="widget-config">
      <div className={`widget-config__item widget-config__item--${props.widget.config.type}`}>
        <h4>
          <i className="material-icons">{props.widget.icon}</i> {props.widget.name}
        </h4>
        <p>{props.widget.id}</p>
      </div>
      <WidgetConfigComponent {...props} />
    </div>
  );
}

export default React.memo(WidgetConfig);

