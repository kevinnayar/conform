import * as React from 'react';
import { useState } from 'react';

function Tabs(props: { headers: string[], children: any }) {
  if (!props.headers.length) return null;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__header">
        {props.headers.map((text, index) => (
          <h3
            className={`tab ${activeIndex === index ? 'tab--active' : ''}`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {text}
          </h3>
        ))}
      </div>
      <div className="tabs__content">
        {props.children.length > 1 ? props.children[activeIndex] : props.children}
      </div>
    </div>
  );
}

export default React.memo(Tabs);


