import * as React from 'react';
import { useState } from 'react';
import BuilderSidebar from './BuilderSidebar';
import BuilderActions from './BuilderActions';
import Tabs from '../Tabs/Tabs';
import WidgetToolbar from '../WidgetToolbar/WidgetToolbar';
import LivePreview from '../LivePreview/LivePreview';
import WidgetConfig from '../WidgetConfig/WidgetConfig';
import { WIDGET_LIST, WidgetType, WidgetDef } from '../../utils/widgetUtils';

type BuilderProps = {
  widgets: { [id: string]: WidgetDef },
  widgetIds: string[],
  onCreateWidget: (widget: WidgetType) => void;
  onUpdateWidget: (widget: WidgetDef) => void;
  onDeleteWidget: (widgetId: string) => void;
};

function Builder(props: BuilderProps) {
  const {
    widgets,
    widgetIds,
    onCreateWidget,
    onUpdateWidget,
    onDeleteWidget,
  } = props;

  const [sidebarBeginCollapsed, setBuilderSidebarBeginCollapsed] = useState(false);
  const [sidebarEndCollapsed, setBuilderSidebarEndCollapsed] = useState(false);

  const [selectedWidget, setSelectedWidget] = useState<WidgetDef>(null);

  const handleSelectWidget = (widgetId: string) => {
    const widget = widgets[widgetId];
    if (widget) setSelectedWidget(widget);
  };

  const handleDeleteWidget = (widgetId: string) => {
    if (selectedWidget && selectedWidget.id === widgetId) setSelectedWidget(null);
    onDeleteWidget(widgetId);
  }

  return (
    <div className={`builder ${sidebarBeginCollapsed ? 'builder-sidebar-begin-visible' : ''} ${sidebarEndCollapsed ? 'builder-sidebar-end-visible' : ''}`}>
      <BuilderSidebar variant="begin" collapsed={sidebarBeginCollapsed}>
        <Tabs headers={['Widgets']}>
          <WidgetToolbar widgets={WIDGET_LIST} onSelectWidget={(widget: WidgetType) => onCreateWidget(widget)} />
        </Tabs>
      </BuilderSidebar>

      <div className="builder__content">
        <div className="builder__inner">
          <LivePreview
            widgets={widgets}
            widgetIds={widgetIds}
            onSelectWidget={handleSelectWidget}
            onDeleteWidget={handleDeleteWidget}
          />
        </div>
      </div>

      <BuilderSidebar variant="end" collapsed={sidebarEndCollapsed}>
        <Tabs headers={['Configuration']}>
          <WidgetConfig widget={selectedWidget} onUpdateWidget={(widget: WidgetDef) => onUpdateWidget(widget)} />
        </Tabs>
      </BuilderSidebar>
      
      <BuilderActions
        sidebarBeginCollapsed={sidebarBeginCollapsed}
        setBuilderSidebarBeginCollapsed={setBuilderSidebarBeginCollapsed}
        sidebarEndCollapsed={sidebarEndCollapsed} 
        setBuilderSidebarEndCollapsed={setBuilderSidebarEndCollapsed}
      />
    </div>
  );
}

export default React.memo(Builder);