
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupMessage from '../Alert/PopupMessage'; 
import LoginAlert from '../Alert/Loginalert';


function WishlistButton({ product, userId, isLoggedIn }) {
    
  const [showMessage, setShowMessage] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
   
    const checkWishlist = async () => {
      try {
       const response = await axios.get(`https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist/${userId}`,{
        headers: {
            Authorization: `${window.localStorage.getItem("token")}`
        }
    });
       const userWishlist = response.data; 
    
       const isInWishlist = userWishlist.some(item => item.product._id === product._id);
        
       setIsInWishlist(isInWishlist);

       
       
      } catch (error) {
        console.error(error);
      }
    };
    if (isLoggedIn) {
      checkWishlist();
    }
  }, [isLoggedIn, userId, product]);

  const toggleWishlist = async () => {
    try {
      if (!isLoggedIn) {
        setShowLoginAlert(true); 
        return; 
      }
      
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist/${userId}/${product._id}`,{
          headers: {
              Authorization: `${window.localStorage.getItem("token")}`
          }
      });
        setIsInWishlist(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        // Add to wishlist
        let wishlists = await axios.post('https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist', { product, userId },{
          headers: {
              Authorization: `${window.localStorage.getItem("token")}`
          }
      });
        console.log(wishlists);
        setIsInWishlist(true);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const closeAlert = () => {
    setShowLoginAlert(false);
  };
  return (
    <div>
      <button className="btn btn-outline-secondary mx-3 mt-2" style={{fontSize:"17px",color:"black"}} onClick={toggleWishlist}>
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
      {showMessage && (
        <PopupMessage message={isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist!'} />
      )}
      {showLoginAlert && <LoginAlert showLoginAlert={showLoginAlert} closeAlert={closeAlert} />}
    </div>
  );
}

export default WishlistButton;
