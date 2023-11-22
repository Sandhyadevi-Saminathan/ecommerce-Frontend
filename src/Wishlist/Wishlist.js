import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
function Wishlist() {
    const [wishlists, setwishlists] = useState([])
    const params = useParams();
    const id = window.localStorage.getItem('id');
    const [isloading, setloading] = useState(true)
    const [showPopup, setShowPopup] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    
    useEffect(() => {
      let timeout;
      if (showPopup || showAlert || showMessage) {
        timeout = setTimeout(() => {
          setShowPopup(false);
          setShowAlert(false)
          setShowMessage(false)
        }, 3000);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [showPopup,showAlert,showMessage]);
    
    useEffect(() => {
      
        getwishlists();

    }, []);
   
    const moveItemToCart = async (product) => {
      try {
        const response = await axios.get(`https://ecommerce-backend-xu6o.onrender.com/cart/addtocart/${id}`,{
          headers: {
              Authorization: `${window.localStorage.getItem("token")}`
          }
      });
      const isInCart = response.data.some((item) => item.product._id === product._id);
       
        if (isInCart) {
        setShowAlert(true)
        } else {
        const response = await axios.post(
          'https://ecommerce-backend-xu6o.onrender.com/cart/addtocart',
          { product, userId: id }, 
          {
            headers: {
              Authorization: `${window.localStorage.getItem("token")}`
            }
          }
        );
        setShowPopup(true)
    
        // Remove the item from the wishlist if it was successfully added to the cart
        if (response.status === 200) {
          await axios.delete(`https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist/${id}/${product._id}`,{
            headers: {
                Authorization: `${window.localStorage.getItem("token")}`
            }
        });
      
        getwishlists()
        }}
      } catch (error) {
        console.error('Error moving item to cart:', error);
        
      }
    };
    
    
    let getwishlists = async () => {
        try {
            const users = await axios.get(`https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist/${id}`,{
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })

            setwishlists(users.data)
            console.log(users.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }

    }
    const removeFromWishlist = async (productId) => {
        try {
          await axios.delete(`https://ecommerce-backend-xu6o.onrender.com/wishlist/wishlist/${id}/${productId}`,{
            headers: {
                Authorization: `${window.localStorage.getItem("token")}`
            }
        });
          console.log(productId)
  
          const updatedWishlist = wishlists.filter((item) => item.product._id !== productId);
          console.log(updatedWishlist)
       setwishlists(updatedWishlist);
       setShowMessage(true)
     getwishlists()
        } catch (error) {
          console.error(error);
        }
      };
    const productData = wishlists[0]?.product;
    return (
        <>
        
        {isloading ? (<div class="col d-flex justify-content-center" >
                <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
            </div>) : (

           
            wishlists.length === 0 ?
                    (< >
                    <h2 className="d-flex justify-content-center align-items-center"  style={{ fontSize: "18px", fontFamily: "cursive" }}>Your wishlist is empty</h2>
                    <div className="d-flex justify-content-center"><Link to="/">
                  <button className="btn btn-primary mt-2"> Add items </button></Link>
</div>
                   
                    </>)
:
    <div className="container">
      <div className="row">
        {wishlists.map((item, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <div className="card h-100">
              <img src={item.product.imageURL} className="card-img-top" alt={item.product.name} />
              <div className="card-body">
                <h5 className="card-title">{item.product.name}</h5>
                <p className="card-text">{item.product.description}</p>
                <p className="card-text"style={{color:"black"}}>Price: {item.product.price}</p>
                <div  className="d-flex justify-content-between align-items-center mt-3"> 
                <button className="btn btn-outline-secondary mx-3 mt-2" onClick={() => moveItemToCart(item.product)}>
            Move to Cart
          </button>
                <button className="btn btn-outline-secondary mx-3 mt-2" onClick={() => removeFromWishlist(item.product._id)}>Remove from Wishlist</button>
              </div>
              </div>
            </div>
          </div>
        ))}
         {showMessage && (
        <div className="alert alert-warning alert-dismissible fade show top-right-alert" >
        <span>Removed from wishlist</span></div>
      )}
         {showPopup && <div className="alert alert-warning alert-dismissible fade show top-right-alert" >
      <span>Moved to cart</span></div>}
      {showAlert && <div className="alert alert-warning alert-dismissible fade show top-right-alert" >
          <span>Already in Cart</span></div>}
      </div>
    </div>
    )}
   
        </>
    )
}

export default Wishlist