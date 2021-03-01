import * as React from 'react';
import { WidgetDef } from '../../utils/widgetUtils';
import Input from '../../widgets/Input/Input';

type WidgetPreviewProps = {
  widget: WidgetDef,
  onSelectWidget: (widgetId: string) => void;
  onDeleteWidget: (widgetId: string) => void;
};

function WidgetPreview(props: WidgetPreviewProps) {
  const { widget, widget: { config, id }} = props;
  return (
    <div className={`widget-preview widget-preview--${config.type}`}>
      
      {config.type === 'input' && <Input id={id} config={config} />}

      <div className="widget-preview__actions">
        <div className="action" onClick={() => props.onSelectWidget(widget.id)}>
          <i className="material-icons">create</i>
        </div>
        <div className="action" onClick={() => props.onDeleteWidget(widget.id)}>
          <i className="material-icons">close</i>
        </div>
      </div>
    </div>
  );
}

type LivePreviewProps = {
  widgets: { [id: string]: WidgetDef },
  widgetIds: string[],
  onSelectWidget: (widgetId: string) => void;
  onDeleteWidget: (widgetId: string) => void;
};

function LivePreview(props: LivePreviewProps) {
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
              onSelectWidget={props.onSelectWidget}
              onDeleteWidget={props.onDeleteWidget}
            />
          )
          : null;
      })}
    </div>
  );
}

export default React.memo(LivePreview);



