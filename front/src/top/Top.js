import React from 'react';
import './Top.scss';

import {
  IconChevronLeft, IconDrone, IconCalendarMonth, IconHeadset, IconPlane, IconDotsVertical} from '@tabler/icons-react';

  const size=30
const Top = () => {
  return <div className="top">

  <div className='topbar'>
  
  <div className="back">
  <div className="backback"><IconChevronLeft size={size} stroke={1.5} /></div>
  </div>
  
  <div className="missionname">
  
  Black cobra
  
</div>

<div className="drone">
<IconDrone size={size} stroke={1.5} />

Бунтар
</div>

<div className="date">
01.04.2024 20:14
<IconCalendarMonth size={size} stroke={1.5} />

</div>

<div className="endgroup">
  <div className="support">
  <IconHeadset size={size} stroke={1.5} />
  Support
  </div>
  
  <div className="dots">
  <IconDotsVertical size={size} stroke={1.5} />
  
  </div>
  <div className="start">
  <IconPlane size={size} stroke={1.5} />
  <p>start mission </p>
  </div>
</div>


</div>

  </div>;
};

export default Top;
