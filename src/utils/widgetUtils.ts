import { v4 as uuidv4 } from 'uuid';

type WidgetTypeKey =
  | 'input'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'button'
;

export type WidgetType = {
  type: WidgetTypeKey;
  name: string;
  icon: string;
  description: string;
};

export const WIDGET_LIST: WidgetType[] = [
  {
    type: 'input',
    name: 'Input',
    icon: 'keyboard',
    description: 'to collect textual information',
  },
  {
    type: 'dropdown',
    name: 'Dropdown',
    icon: 'grading',
    description: 'for selecting zero or more of many choices',
  },
  {
    type: 'radio',
    name: 'Radio Button',
    icon: 'radio_button_checked',
    description: 'for selecting one of many choices',
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    icon: 'check_box',
    description: 'to enable or disable something',
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'next_plan',
    description: 'to take a specific action or submit',
  },
];

type WidgetConfigDefBase = {
  required: boolean;
};

export type WidgetConfigDefInput = WidgetConfigDefBase & {
  type: 'input';
  value: string;
  inputType: 'string' | 'number' | 'email' | 'url' | 'phone' | 'date' | 'time' | 'dateTime';
};

type DropdownItem = {
  name: string,
  key: string,
};

export type WidgetConfigDefDropdown = WidgetConfigDefBase & {
  type: 'dropdown';
  values: DropdownItem[];
  allowEmpty: boolean;
};

export type WidgetConfigDefRadio = WidgetConfigDefBase & {
  type: 'radio';
  values: string[];
};

export type WidgetConfigDefCheckbox = WidgetConfigDefBase & {
  type: 'checkbox';
  value: string;
};

export type WidgetConfigDefButton = WidgetConfigDefBase & {
  type: 'button';
  value: string;
  onClick: (...args: any[]) => {};
};

export type WidgetConfigDef = 
  | WidgetConfigDefInput
  | WidgetConfigDefDropdown
  | WidgetConfigDefRadio
  | WidgetConfigDefCheckbox
  | WidgetConfigDefButton
;

export type WidgetDef = {
  id: string;
  name: string;
  icon: string;
  config: WidgetConfigDef;
};

function createInitialWidgetConfig(type: WidgetTypeKey) {
  switch(type) {
    case 'input': {
      const config: WidgetConfigDefInput = {
        type,
        required: false,
        value: '',
        inputType: 'string',
      };
      return config;
    }
    case 'dropdown': {
      const config: WidgetConfigDefDropdown = {
        type,
        required: false,
        values: [],
        allowEmpty: true,
      };
      return config;
    }
    case 'radio': {
      const config: WidgetConfigDefRadio = {
        type,
        required: false,
        values: [],
      };
      return config;
    }
    case 'checkbox': {
      const config: WidgetConfigDefCheckbox = {
        type,
        required: false,
        value: '',
      };
      return config;
    }
    case 'button': {
      const config: WidgetConfigDefButton = {
        type,
        required: false,
        value: 'Submit',
        onClick: () => undefined,
      };
      return config;
    }
    default: throw new Error(`Unsupported widget type: ${type}`);
  }
}

export function createWidget(widget: WidgetType): WidgetDef {
  const { type, name, icon } = widget;
  return {
    id: `${type}_${uuidv4()}`,
    name,
    icon,
    config: createInitialWidgetConfig(type),
  };
}