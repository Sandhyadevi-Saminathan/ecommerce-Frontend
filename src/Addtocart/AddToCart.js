import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupMessage from '../Alert/PopupMessage'; 
import LoginAlert from '../Alert/Loginalert';

function AddToCart({ product, userId, isLoggedIn }) {
    const [showMessage, setShowMessage] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
const [showLoginAlert, setShowLoginAlert] = useState(false);


  useEffect(() => {
  const checkCart = async () => {
    try {
      if (!isLoggedIn) return;
        const response = await axios.get(`http://localhost:8000/addtocart/${userId}`,{
          headers: {
              Authorization: `${window.localStorage.getItem("token")}`
          }
      });
      const userCart = response.data;
      const addedToCart = userCart.some((item) => item.product._id === product._id);
      setIsAddedToCart(addedToCart);
    } 
    catch (error) {
        console.error(error);
      }
    };
    checkCart();
          
    }, [isLoggedIn, userId, product]);

    const handleCartAction = async () => {
        try {
          if (!isLoggedIn) {
            setShowLoginAlert(true); 
            return;
          }
          
          if (isAddedToCart) {
            // Remove from wishlist
            await axios.delete(`http://localhost:8000/addtocart/${userId}/${product._id}`,{
              headers: {
                  Authorization: `${window.localStorage.getItem("token")}`
              }
          });
          setIsAddedToCart(false);
          } else {
            // Add to wishlist
            let cart = await axios.post('http://localhost:8000/addtocart', { product, userId },{
              headers: {
                  Authorization: `${window.localStorage.getItem("token")}`
              }
          });
          setIsAddedToCart(true);
           
          }
          setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
          console.error(error);
        }
      };

      const closeAlert = () => {
        setShowLoginAlert(false);
      };

  return (
    <div>
      <button className="btn btn-outline-primary mx-3 mt-2" style={{fontSize:"17px",color:"black"}} onClick={handleCartAction}>
        {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
      {showMessage && (
        <PopupMessage message={isAddedToCart ? 'Added to Cart!' : 'Removed from Cart!'} />
      )}
      {showLoginAlert && <LoginAlert showLoginAlert={showLoginAlert} closeAlert={closeAlert} />}
    </div>
  );
}

export default AddToCart;
