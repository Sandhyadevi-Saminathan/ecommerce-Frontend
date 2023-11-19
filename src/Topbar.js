// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'


// function Topbar() {
   
//     const data = localStorage.getItem('Role');
//     const id = localStorage.getItem('ID');

   
//     return (
//         <>
           
                
//                 <nav className="navbar-nav bg-gradient-primary topbar topbar-dark accordion mb-4 static-top shadow">


//                     <ul className="navbar-nav ml-auto">

//                         <li className="nav-item dropdown no-arrow">
//                             <Link className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
//                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

//                                 {/* <span class="font-weight-bold" style={{ color: "black" }}>Hello</span> */}
//                                 <Link className="nav-link" to={`/portal/profile/${id}`}>
//                                     <span className="mr-2 d-none d-lg-inline text-white - 600 medium" > Profile</span>
//                                 </Link>

//                                 <Link className="nav-link" to="/">


//                                     <img className="img-profile rounded-circle"
//                                         src="https://th.bing.com/th/id/OIP.1asifY692Tb7m4S1HQgVkwHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></Link>

//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
            


//         </>
//     )
// }

// export default Topbar

// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { Link } from 'react-router-dom';


// function Topbar({ toggleSidebar,showSidebar }) {
//     const buttonStyle = {
//         color: showSidebar ? '#ffffff' : '#000000', // Contrast color
//         backgroundColor: 'transparent',
//         border: 'none',
//         outline: 'none',
//         cursor: 'pointer',
//         width:"100px",
//         height:"66px",
//         fontSize: '24px',
//       };
//   return (
//     <nav className="navbar-nav bg-gradient-primary topbar topbar-dark accordion mb-4 static-top shadow">
//       <button className="btn btn-link" onClick={toggleSidebar} style={buttonStyle}>
//       {showSidebar ? (
//           <FontAwesomeIcon icon={faTimes} />
//         ) : (
//           <FontAwesomeIcon icon={faBars} />
//         )}
//       </button>
//       <ul className="navbar-nav ml-auto">

//                         <li className="nav-item dropdown no-arrow">
//                              <Link className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
//                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            
//                                 <Link className="nav-link" to={`/portal/profile`}>
//                                     <span className="mr-2 d-none d-lg-inline text-white - 600 medium" > Profile</span>
//                                 </Link>

//                                 <Link className="nav-link" to="/">


//                                     <img className="img-profile rounded-circle"
//                                         src="https://th.bing.com/th/id/OIP.1asifY692Tb7m4S1HQgVkwHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></Link>

//                             </Link>
//                         </li>
//                     </ul>
//     </nav>
//   );
// }

// export default Topbar;


// ... (other imports)


import { faBars, faTimes, faSignOutAlt, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Topbar({ toggleSidebar, showSidebar }) {
  const buttonStyle = {
    color: showSidebar ? '#000000' : '#ffffff', // Contrast color
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    width: '100px',
    height: '66px',
    fontSize: '20px',
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
      <button className="btn btn-link" onClick={toggleSidebar} style={buttonStyle}>
        {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link className="nav-link" to="/">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/portal/wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/portal/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/portal/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Topbar;

  





