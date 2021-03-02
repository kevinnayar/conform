import * as React from 'react';
import { useState } from 'react';
import { WidgetConfigDefInput } from '../../utils/widgetUtils';

export type InputProps = {
  id: string;
  config: WidgetConfigDefInput,
};

function Input(props: InputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const runValidation = (e: any) => {
    setError(null);

    if (props.config.required && value === '') {
      setError('This field cannot be empty.');
    }
  }

  return (
    <div>
      <label>{props.config.value}</label>
      <input
        className="input"
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
        onBlur={(e: any) => runValidation(e)}
      />
      {error && <p className="form__error">{error}</p>}
    </div>
  );
}

export default React.memo(Input);


