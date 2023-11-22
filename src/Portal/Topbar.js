import { faBars, faTimes, faSignOutAlt, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginAlert from '../Alert/Loginalert';




function Topbar({ toggleSidebar, showSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigates=useNavigate();
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setIsLoggedIn(false)
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (showPopup) {
      timeout = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showPopup]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const checkLoginStatus = () => {
    const isLoggedIn = !!localStorage.getItem('token'); 
    return isLoggedIn;
  };
  const handleCartClick = () => {
    const isLoggedIn = checkLoginStatus();
    if (isLoggedIn) {
      navigates("/cart")
     
    } else {
      setShowLoginAlert(true); 
    }
  };

  const handleWishlistClick = () => {
    console.log('Wishlist Clicked');
    const isLoggedIn = checkLoginStatus();
    if (isLoggedIn) {
      console.log("hi")
     navigates("/wishlist")
  
     
    } else {
      setShowLoginAlert(true); 
    }
  };
  const closeAlert = () => {
    setShowLoginAlert(false);
  };
  const buttonStyle = {
    color: showSidebar ? '#000000' : '#ffffff',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    width: '100px',
    height: '66px',
    fontSize: '20px',
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
      <button className="btn btn-link" onClick={toggleSidebar} style={buttonStyle}>
        {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      <ul className="navbar-nav ml-auto">
     
        <li className="nav-item">
          <button className="nav-link"  onClick={handleWishlistClick}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </li>
        <li className="nav-item" >
          <button className="nav-link" onClick={handleCartClick} >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button> 
        </li>
       
       
       <li className="nav-item">
        <div className="nav-link"onClick={toggleDropdown} style={{ position: 'relative' }}>
        <FontAwesomeIcon icon={faUser} />
         
          <div 
           ref={dropdownRef}
          className={`dropdown-menu${showDropdown ? ' show' : ''}`}
           style={{
            position: 'absolute',
            top: '60px',
            left: '-60px',
            minWidth: '100px',
            maxWidth: '200px', 
            maxHeight: '200px', 
            overflowY: 'auto', 
            backgroundColor: 'turquoise',
            color: 'black',
          }}
         >
          
              {isLoggedIn ? (
                // If logged in, show profile-related options
                <>
                  <Link to="/profile" className="dropdown-item" >
                    My Profile
                  </Link>
                  <Link to="/orderlist" className="dropdown-item">
                    My order
                  </Link>
               
                  <Link to="/" className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                // If not logged in, show login option
                <Link to="/login" className="dropdown-item">
                  Login/Register
                </Link>
              )}
            </div>
            </div>
        </li>
        <li className="nav-item" >
          <Link className="nav-link" to="/">
            <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}/>
          </Link>
        </li>
  
        {showLoginAlert && <LoginAlert showLoginAlert={showLoginAlert} closeAlert={closeAlert} />}
        {showPopup && <div className="alert alert-warning alert-dismissible fade show top-right-alert" >
      <span>Logged out successfully</span>
      <button type="button" className="close" onClick={closePopup}>
            <span aria-hidden="true">&times;</span>
          </button>
     
    </div>}
      </ul>
    </nav>
  );
}

export default Topbar;

  





