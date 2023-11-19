// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
// import Topbar from './Topbar'



// function Portal() {
//     return (
//         <>
//             <div id="wrapper" >
//                 <Sidebar ></Sidebar>
//                 <div id="content-wrapper" className="d-flex flex-column" >
//                     <div id="content" >

//                         <Topbar></Topbar >


//                         <div className="container-fluid" style={{ paddingTop: "10px", paddingLeft: "260px" }}>

//                             <Outlet ></Outlet>
//                         </div>

//                     </div>
//                 </div>

//             </div>

//         </>
//     )
// }

// export default Portal

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Home from './Home';

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
          <Topbar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/> {/* Then render the Topbar */}
          {/* <div className="container-fluid" style={{ paddingTop: "10px" }}> */}
          
            <Outlet />
          </div>
        </div>
      </div>
    // </div>
  );
}

export default Portal;



