import * as React from 'react';
import { WidgetDef } from '../../utils/widgetUtils';

type WidgetPreviewProps = {
  widget: WidgetDef,
  onUpdateWidget: (widget: WidgetDef) => void;
  onDeleteWidget: (widgetId: string) => void;
};

function WidgetPreview(props: WidgetPreviewProps) {
  return (
    <div className={`widget-preview widget-preview--${props.widget.config.type}`}>
      <h2><i className="material-icons">{props.widget.icon}</i> {props.widget.name}</h2>

      <div className="widget-preview__actions">
        <div className="action" onClick={() => props.onUpdateWidget(props.widget)}>
          <i className="material-icons">create</i>
        </div>
        <div className="action" onClick={() => props.onDeleteWidget(props.widget.id)}>
          <i className="material-icons">close</i>
        </div>
      </div>
    </div>
  );
}

type LivePreviewProps = {
  widgets: { [id: string]: WidgetDef },
  widgetIds: string[],
  onUpdateWidget: (widget: WidgetDef) => void;
  onDeleteWidget: (widgetId: string) => void;
};

export function LivePreview(props: LivePreviewProps) {
  const isEmpty = !props.widgetIds.length;

  return (
    <div className={`live-preview ${isEmpty ? 'live-preview--empty' : ''}`}>
      {isEmpty && <h1>Live Preview</h1>}

      {props.widgetIds.map((id) => {
        const widget = props.widgets[id];
        return (widget)
          ? (
            <WidgetPreview
              key={id}
              widget={widget}
              onUpdateWidget={props.onUpdateWidget}
              onDeleteWidget={props.onDeleteWidget}
            />
          )
          : null;
      })}
    </div>
  );
}


