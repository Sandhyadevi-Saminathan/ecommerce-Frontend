

import React from 'react';

function Product({
  product,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  isInCart,
  isInWishlist,
}) {
  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="product">
      {/* Product details */}
      <button onClick={handleAddToCart}>
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
      <button onClick={handleAddToWishlist}>
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default Product;
