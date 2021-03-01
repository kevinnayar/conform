import * as React from 'react';
import { useState } from 'react';
import {
  WIDGET_LIST,
  WidgetType,
  WidgetDef,
} from '../../utils/widgetUtils';

import Tabs from '../Tabs/Tabs';
import { WidgetToolbar } from '../WidgetToolbar/WidgetToolbar';
import { SettingsToolbar, SettingType } from '../SettingsToolbar/SettingsToolbar';
import { LivePreview } from '../LivePreview/LivePreview';

type SidebarProps = {
  variant: string;
  collapsed: boolean;
  children: any;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className={`builder__sidebar builder__sidebar--${props.variant} ${props.collapsed ? 'collapsed' : ''}`}>
      {props.children}
    </div>
  );
}

const SETTINGS: SettingType[] = [
  { type: 'formName', name: 'Form Name' },
  { type: 'formId', name: 'Form ID' },
]

type BuilderProps = {
  widgets: { [id: string]: WidgetDef },
  widgetIds: string[],
  onCreateWidget: (widget: WidgetType) => void;
  onUpdateWidget: (widget: WidgetDef) => void;
  onDeleteWidget: (widgetId: string) => void;
};

function Builder(props: BuilderProps) {
  const [sidebarBeginCollapsed, setSidebarBeginCollapsed] = useState(false);
  const [sidebarEndCollapsed, setSidebarEndCollapsed] = useState(false);

  return (
    <div className={`builder ${sidebarBeginCollapsed ? 'builder-sidebar-begin-visible' : ''} ${sidebarEndCollapsed ? 'builder-sidebar-end-visible' : ''}`}>
      <Sidebar variant="begin" collapsed={sidebarBeginCollapsed}>
        <div className="builder__inner">
          <Tabs headers={['Widgets', 'Settings']}>
            <WidgetToolbar widgets={WIDGET_LIST} onSelectWidget={(widget: WidgetType) => props.onCreateWidget(widget)} />
            <SettingsToolbar settings={SETTINGS} />
          </Tabs>
        </div>
      </Sidebar>

      <div className="builder__content">
        <div className="builder__inner">
          <LivePreview
            widgets={props.widgets}
            widgetIds={props.widgetIds}
            onUpdateWidget={props.onUpdateWidget}
            onDeleteWidget={props.onDeleteWidget}
          />
        </div>
      </div>

      <Sidebar variant="end" collapsed={sidebarEndCollapsed}>
        <div className="builder__inner">
        </div>
      </Sidebar>

      <div className="builder__actions">
        <div className="action action--begin" onClick={() => setSidebarBeginCollapsed(!sidebarBeginCollapsed)}>
          <i className="material-icons">{!sidebarBeginCollapsed ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}</i>
        </div>
        <div className="action action--end" onClick={() => setSidebarEndCollapsed(!sidebarEndCollapsed)}>
          <i className="material-icons">{!sidebarEndCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}</i>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Builder);