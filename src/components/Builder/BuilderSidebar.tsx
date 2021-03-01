import * as React from 'react';

type BuilderSidebarProps = {
  variant: string;
  collapsed: boolean;
  children: any;
};

function BuilderSidebar(props: BuilderSidebarProps) {
  return (
    <div className={`builder__sidebar builder__sidebar--${props.variant} ${props.collapsed ? 'collapsed' : ''}`}>
      {props.children}
    </div>
  );
}

export default React.memo(BuilderSidebar);

