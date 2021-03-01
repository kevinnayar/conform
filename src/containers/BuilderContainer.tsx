import * as React from 'react';
import { useState } from 'react';
import {
  WidgetType,
  WidgetDef,
  createWidget,
} from '../utils/widgetUtils';
import Builder from '../components/Builder/Builder';

function BuilderContainer() {
  const [widgets, setWidgets] = useState<{ [id: string]: WidgetDef }>({});
  const [widgetIds, setWidgetIds] = useState([]);

  const onCreateWidget = (widget: WidgetType) => {
    const newWidget = createWidget(widget);
    setWidgetIds([...widgetIds, newWidget.id]);
    setWidgets({ ...widgets, [newWidget.id]: newWidget });
  };

  const onUpdateWidget = (widget: WidgetDef) => {
    setWidgets({ ...widgets, [widget.id]: widget });
  };

  const onDeleteWidget = (widgetId: string) => {
    const restWidgetIds = widgetIds.filter(id => id !== widgetId);
    setWidgetIds(restWidgetIds);

    const { [widgetId]: omit, ...restWidgets } = widgets;
    setWidgets(restWidgets);
  };

  return (
    <Builder
      widgets={widgets}
      widgetIds={widgetIds}
      onCreateWidget={onCreateWidget}
      onUpdateWidget={onUpdateWidget}
      onDeleteWidget={onDeleteWidget}
    />
  );
}

export default React.memo(BuilderContainer);




