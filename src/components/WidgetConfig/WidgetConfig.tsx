import * as React from 'react';
import { useState } from 'react';
import {
  WidgetDef,
  WidgetConfigDef,
  WidgetConfigDefInput,
  WidgetConfigDefDropdown,
  WidgetConfigDefRadio,
  WidgetConfigDefCheckbox,
  WidgetConfigDefButton,
} from '../../utils/widgetUtils';

type GenericWidgetProps<T> = {
  config: T,
  onUpdateWidgetConfig: (config: T) => void;
};

function WidgetConfigInput(props: GenericWidgetProps<WidgetConfigDefInput>) {
  const [inputType, setInputType] = useState(props.config.inputType);
  const [required, setRequired] = useState(props.config.required);
  const [type, setType] = useState(props.config.type);
  const [value, setValue] = useState(props.config.value);

  return (
    <div className={`widget-config__item widget-config__item--${props.config.type}`}>
      <input
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
        onBlur={() => props.onUpdateWidgetConfig({ ...props.config, value })}
      />
    </div>
  );
}

function WidgetConfigDropdown(props: GenericWidgetProps<WidgetConfigDefDropdown>) {
  const [allowEmpty, setAllowEmpty] = useState(props.config.allowEmpty);
  const [required, setRequired] = useState(props.config.required);
  const [type, setType] = useState(props.config.type);
  const [values, setValues] = useState(props.config.values);

  return (
    <div className={`widget-config__item widget-config__item--${props.config.type}`}>
      <input
        value={values.join(', ')}
        onChange={(e: any) => setValues( e.currentTarget.value.split(',').trim() )}
        onBlur={() => props.onUpdateWidgetConfig({ ...props.config, values })}
      />
    </div>
  );
}

export type WidgetConfigFormProps = {
  widget: WidgetDef;
  onUpdateWidget: (widget: WidgetDef) => void;
};

function WidgetConfigForm(props: WidgetConfigFormProps) {
  const onUpdateWidgetConfig = (config: WidgetConfigDef) => {
    props.onUpdateWidget({
      ...props.widget,
      config,
    });
  };

  if (props.widget.config.type === 'input') {
    const config: WidgetConfigDefInput = props.widget.config;
    return <WidgetConfigInput config={config} onUpdateWidgetConfig={onUpdateWidgetConfig} />
  }
  if (props.widget.config.type === 'dropdown') {
    const config: WidgetConfigDefDropdown = props.widget.config;
    return <WidgetConfigDropdown config={config} onUpdateWidgetConfig={onUpdateWidgetConfig} />
  }
}

function WidgetConfigHeader(props: { widget: null | WidgetDef}) {
  return (
    <div className="widget-config__item">
      {props.widget
        ? (
          <React.Fragment>
            <h4>
              <i className="material-icons">{props.widget.icon}</i> {props.widget.name}
            </h4>
            <p>{props.widget.id}</p>
          </React.Fragment>
        ) : (
          <p>No widget selected.</p>
        )
      }
    </div>
  );
}

export type WidgetConfigProps = {
  widget: null | WidgetDef;
  onUpdateWidget: (widget: WidgetDef) => void;
};

function WidgetConfig(props: WidgetConfigProps) {
  return (
    <div className="widget-config">
      <WidgetConfigHeader widget={props.widget} />
      {props.widget && <WidgetConfigForm {...props} />}
    </div>
  );
}

export default React.memo(WidgetConfig);

