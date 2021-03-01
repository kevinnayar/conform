import * as React from 'react';
import { useState } from 'react';
import { WidgetDef } from '../../utils/widgetUtils';

export type WidgetConfigProps = {
  widget: null | WidgetDef;
  onUpdateWidget: (widget: WidgetDef) => void;
};

function WidgetConfig(props: WidgetConfigProps) {
  if (!props.widget) return <p>No widget selected.</p>;

  return (
    <div>
      {JSON.stringify(props.widget)}
    </div>
  );
}

export default React.memo(WidgetConfig);




