import './style.css';

import { genders } from './data';
import { useState } from 'react';
import { ToggleButtonGroup, ToggleButtonRef } from './components';

export default function ABOBA() {
  const [activeValue, setActiveValue] = useState();

  const onChange = (e: any) => setActiveValue(e.target.value);

  return (
    <ToggleButtonGroup activeValue={activeValue} onChange={onChange} name='gender'>
      {/* {genders.map(({ icon, value }) => (
        // <ToggleButtonRef value={value} key={value}>
        //   <img src={icon} va={value} className='Image' />
        //   {value}
        // </ToggleButtonRef>
      ))} */}
    </ToggleButtonGroup>
  );
}
