import { useState } from 'react';

function Usecartandwishlist() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (productId) => {
    setCartItems([...cartItems, productId]);
  };

  const addToWishlist = (productId) => {
    setWishlistItems([...wishlistItems, productId]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item !== productId);
    setCartItems(updatedCart);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter((item) => item !== productId);
    setWishlistItems(updatedWishlist);
  };

  const isInCart = (productId) => {
    return cartItems.includes(productId);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  return {
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    isInCart,
    isInWishlist,
    cartItems,
    wishlistItems,
  };
}

export default Usecartandwishlist;
