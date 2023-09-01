import './style.css';

import React, { forwardRef, useEffect, useRef, useState } from 'react';

function ToggleButton({ children, value, onChange, name, forwardedRef }: any) {
  return (
    <label htmlFor={value} className='ToggleButton' ref={forwardedRef}>
      <input type='radio' name={name} id={value} value={value} onChange={onChange} />
      {children}
    </label>
  );
}

export const ToggleButtonRef = forwardRef<any>((props, ref) => (
  <ToggleButton forwardedRef={ref} {...props} />
));

function ActivePointer({ offsetX, width }: any) {
  return <span className='ActivePointer' style={{ left: offsetX, width }} />;
}

export function ToggleButtonGroup({ name, onChange, children, activeValue }: any) {
  const ref = useRef<any>();
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (ref.current) setOffsetX(ref.current.offsetLeft as any);
  }, [setOffsetX, activeValue]);

  return (
    <div className='ToggleButtonGroup'>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onChange,
          name,
          ref: child.props.value === activeValue ? ref : null,
        })
      )}
      <ActivePointer offsetX={offsetX} width={`${100 / children.length}%`} />
    </div>
  );
}
