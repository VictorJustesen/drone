import React, { useState } from 'react';
import './Sidebar.scss';
import {
  IconSend, IconSearch, IconCurrentLocation, IconMapPin,
  IconLine, IconCircle, IconRectangle, IconPentagon, IconRuler3, IconRoute
} from '@tabler/icons-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  // Function to handle item click
  const handleItemClick = (itemId) => {
    setActiveItem(itemId); // Update the active item state
  };

  // Helper function to generate Sidebar item
  const SidebarItem = ({ id, icon }) => (
    <div
      className={`Sidebar-item ${activeItem === id ? 'active' : ''}`}
      onClick={() => handleItemClick(id)}
    >
      {icon}
    </div>
  );

  return (
    <div className="Sidebar">
      <div className='Sidebar-group'>
        <SidebarItem id="send" icon={<IconSend size={30} stroke={1.5} />} />
        <SidebarItem id="search" icon={<IconSearch size={30} stroke={1.5} />} />
      </div>

      <div className='Sidebar-group'>
        <SidebarItem id="route" icon={<IconRoute size={30} stroke={1.5} />} />
        <SidebarItem id="currentLocation" icon={<IconCurrentLocation size={30} stroke={1.5} />} />
        <SidebarItem id="mapPin" icon={<IconMapPin size={30} stroke={1.5} />} />
      </div>

      <div className='Sidebar-group'>
        <SidebarItem id="line" icon={<IconLine size={30} stroke={1.5} />} />
        <SidebarItem id="circle" icon={<IconCircle size={30} stroke={1.5} />} />
        <SidebarItem id="rectangle" icon={<IconRectangle size={30} stroke={1.5} />} />
        <SidebarItem id="pentagon" icon={<IconPentagon size={30} stroke={1.5} />} />
      </div>

      <div className='Sidebar-group'>
        <SidebarItem id="ruler3" icon={<IconRuler3 size={30} stroke={1.5} />} />
      </div>
    </div>
  );
};

export default Sidebar;
