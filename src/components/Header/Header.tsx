import * as React from 'react';

function Header() {
  return (
    <header className="header">
      <i className="material-icons">clear_all</i>
      <h1>ConformBuilder</h1>
    </header>
  );
}

export default React.memo(Header);


