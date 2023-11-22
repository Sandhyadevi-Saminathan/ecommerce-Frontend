import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Home from '../Components/Home';


function Portal() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div id="wrapper">
      {showSidebar && <Sidebar />} {/* Render the Sidebar first */}
      <div id="content-wrapper" className={`d-flex flex-column ${showSidebar ? 'toggled' : ''}`}>
        <div id="content">
          <Topbar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/> 
               
            <Outlet />
          </div>
        </div>
      </div>
   
  );
}

export default Portal;



