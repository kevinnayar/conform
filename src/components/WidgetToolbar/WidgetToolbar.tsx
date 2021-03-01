import * as React from 'react';
import { WidgetType } from '../../utils/widgetUtils';

function WidgetToolbarItem(props: { widget: WidgetType, onSelect: (widget: WidgetType) => void }) {
  return (
    <div
      className={`toolbar__item widget-toolbar__item widget-toolbar__item--${props.widget.type}`}
      onClick={(e: any) => {
        e.preventDefault();
        props.onSelect(props.widget)
      }}
    >
      <h3>
        <i className="material-icons">{props.widget.icon}</i> {props.widget.name}
      </h3>
      <p>{props.widget.description}</p>
    </div>
  );
}

function WidgetToolbar(props: { widgets: WidgetType[], onSelectWidget: (widget: WidgetType) => void }) {
  return (
    <div className="toolbar widget-toolbar">
      {props.widgets.map(w => <WidgetToolbarItem key={w.type} widget={w} onSelect={props.onSelectWidget} />)}
    </div>
  );
}

export default React.memo(WidgetToolbar);


