import React, { useEffect } from 'react';
import "../Css/Loginalert.css"

const LoginAlert = ({ showLoginAlert, closeAlert }) => {
    useEffect(() => {
        if (showLoginAlert) {
          const timeout = setTimeout(() => {
            closeAlert();
          }, 4000); 
    
          return () => clearTimeout(timeout);
        }
      }, [showLoginAlert, closeAlert]);
  return (
    <>
      {showLoginAlert && (
        <div className="alert alert-warning alert-dismissible fade show top-right-alert" role="alert">
          Please login or register to continue.
          <button type="button" className="close" onClick={closeAlert}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default LoginAlert;
