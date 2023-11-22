
import React, { useEffect } from 'react';
import '../Css/PopupMessage.css'; 

function PopupMessage({ message }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
    
    }, 3000);

    return () => clearTimeout(timeout); 
  });

  return (
    <div className="alert alert-warning alert-dismissible fade show top-right-alert" >
      <span>{message}</span>
     
    </div>
  );
}

export default PopupMessage;
