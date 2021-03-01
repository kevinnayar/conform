import * as React from 'react';

type BuilderActionsProps = {
  sidebarBeginCollapsed: boolean;
  setBuilderSidebarBeginCollapsed: (collapse: boolean) => void;
  sidebarEndCollapsed: boolean;
  setBuilderSidebarEndCollapsed: (collapse: boolean) => void;
};

function BuilderActions(props: BuilderActionsProps) {
  const {
    sidebarBeginCollapsed,
    setBuilderSidebarBeginCollapsed,
    sidebarEndCollapsed,
    setBuilderSidebarEndCollapsed,
  } = props;

  return (
    <div className="builder__actions">
      <div className="action action--begin" onClick={() => setBuilderSidebarBeginCollapsed(!sidebarBeginCollapsed)}>
        <i className="material-icons">{!sidebarBeginCollapsed ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}</i>
      </div>
      <div className="action action--end" onClick={() => setBuilderSidebarEndCollapsed(!sidebarEndCollapsed)}>
        <i className="material-icons">{!sidebarEndCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}</i>
      </div>
    </div>
  );
}

export default React.memo(BuilderActions);